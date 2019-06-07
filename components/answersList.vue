<template>
  <div v-if="questions" id="quiz-container">
    <div
      v-for="(question, index) in questions"
      v-show="question.ID == activeID"
      :id="'question-' + question.ID"
      :key="index"
      :data-id="question.ID"
      class="quiz-question"
    >
      <article class="card question-card">
        <h2 class="card-header h3 mb-0" v-html="question.question"></h2>

        <div class="list-group">
          <button
            v-for="(answer, answerIndex) in question.answers"
            :id="'question-' + question.ID + '-answer-' + answer.id"
            :key="answerIndex"
            class="list-group-item list-group-item-action btn-answer"
            @click="validateAnswer(question, answer)"
          >
            <p class="mb-0">
              <span v-html="answer.text"></span>
              <b-badge v-if="isEvnDev" class="text-white">{{
                answer.is_valid
              }}</b-badge>
            </p>
          </button>
        </div>
        <div class="question-details text-center pt-1 pb-1">
          <span class="quiestion-manual-id pb-1 badge badge-pill badge-info">
            #{{ question.manual_question_id }}
          </span>
          <span class="question-term pb-1 badge badge-pill badge-primary">
            {{ argument.name }}
          </span>
        </div>
      </article>
      <button
        v-show="showContinueBtn"
        class="btn btn-secondary ml-auto mr-auto mt-3 w-100"
        @click="nextQuestion(question)"
      >
        Continua
      </button>
    </div>
    <div class="counter font-2 text-center mt-3">
      {{ count }} di {{ total }} domande
    </div>
  </div>
</template>

<script>
/**
 * Importiamo il mapGetters di vuex
 */
import { mapGetters } from 'vuex'
import { NAMESPACE } from '~/store/auth'
export default {
  /**
   * Definiamo le props
   * I dati che il componente si aspetta di ricevere
   */
  props: {
    quizDetails: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  /**
   * Definiamo i dati reattivi
   */
  data() {
    return {
      count: 1,
      report: { valid: [], invalid: [] },
      api_report: [],
      showContinueBtn: false,
      activeID: this.quizDetails.questions[0].ID,
      isEvnDev: process.env && process.env.NODE_ENV !== 'production'
    }
  },
  /**
   * Otteniamo le "Computed Properties" che ci aiutano a mantenere più pulito il codice
   * nel caso in qui nel pomponente abbiamo bisogno di dati che sono ril risultato di una o più elaborazioni.
   */
  computed: {
    questions() {
      return this.quizDetails.questions
    },
    argument() {
      return this.quizDetails.argument
    },
    total() {
      return this.quizDetails.questions.length
    },
    // Utilizziamo un getter per ottenere l'id dell'utente corrente
    ...mapGetters(NAMESPACE, ['getCurrentUserID'])
  },
  /**
   * Definiamo i metodi che saranno utilizzati dal componente
   */
  methods: {
    // Disabilita i pulsanti
    disableAnswersBtn() {
      document.querySelectorAll('.btn-answer').forEach(item => {
        item.disabled = true
      })
    },
    // Abilita i pulsanti
    enableAnswersBtn() {
      document.querySelectorAll('.btn-answer').forEach(item => {
        item.disabled = false
      })
    },
    // Validazione risposta
    async validateAnswer(question, answer) {
      this.disableAnswersBtn() // Disabilitiamo il click sulle risposte
      const currentAnswer = document.getElementById(
        'question-' + question.ID + '-answer-' + answer.id
      )
      if (!currentAnswer) return false
      const report = {
        question: question.question,
        answer: answer.text
      }
      // Prepariamo il report che salveremo su WordPress tramite API
      const apiReport = {
        argument_id: question.argument.term_id,
        question_id: question.ID,
        answer_id: answer.id,
        is_valid: answer.is_valid,
        date: this.getDateTime()
      }
      this.api_report.push(apiReport)

      // Risposta valida
      if (answer.is_valid) {
        this.$store.commit('transitions/activate', 'slide-left') // Avviamo l'animazione in uscita
        currentAnswer.classList.add('bg-success', 'text-light') // Coloriamo la risposta
        this.report.valid.push(report) // Aggiungiamo il risultato al report delle risposte corrette

        // INCREDIBILE ci tocca aggiungere una pausa per evitare che il passaggio, da una risposta all'altra, sia troppo rapido 🤩
        const self = this
        await this.sleep(self.$store.state.transitions.duration) // sleep è una helper custom - vedi plugins/js-helpers.client.js
        self.nextQuestion(question, true) // Mostriamo la domanda successiva
      } else {
        // Risposta errata
        this.$store.commit('transitions/activate', 'slide-right') // Avvio l'animazione in uscita
        currentAnswer.classList.add('bg-danger', 'text-light') // Coloriamo la risposta
        // Cerchiamo la risposta corretta e la coloriamo
        question.answers.forEach(item => {
          if (item.is_valid)
            document
              .getElementById('question-' + question.ID + '-answer-' + item.id)
              .classList.add('bg-success', 'text-light')
        })

        // Mostriamo il pulsante che permetterà di passare alla domanda successiva dopo aver riflettuto sui propri errori e sul perché della vita 🤔
        this.showContinueBtn = true
        this.report.invalid.push(report) // Aggiungiamo il risultato al report delle risposte errate
      }
    },
    // Passiamo alla domanda successiva
    nextQuestion(question, skipTransition) {
      // Se l'origine dell'evento è il click sul pulsante "continua" avviamo l'animazione di uscita della risposta predentemente errata
      if (!skipTransition)
        this.$store.commit('transitions/activate', 'slide-left')

      this.enableAnswersBtn() // Abilitiamo il click sulle risposte
      this.showContinueBtn = false // nascondiamo il pulsante continua

      // Cerchiamo la domanda successiva
      const nextElement = document.getElementById('question-' + question.ID)
        .nextSibling
      const questionElement =
        nextElement &&
        nextElement.classList &&
        nextElement.classList.contains('quiz-question')
          ? nextElement
          : false

      // Domanda successiva trovata
      if (questionElement) {
        this.count++
        this.activeID = questionElement.getAttribute('data-id')
      } else {
        // Non vi sono altre domande, fine del quiz
        this.saveUserStats() // Salviamo le statistiche via API
        this.showReport() // Mostrimao il report del quiz
      }
    },
    // Salviamo
    saveUserStats() {
      this.$nuxt.$loading.start() // Avviamo il loader di Nuxt
      // Salviamo le statistiche tramite API
      this.$axios
        .post('/wp-json/nuxt/v1/saveuserstats', {
          user_id: parseInt(this.user_id),
          argument_id: parseInt(this.argument.term_id),
          answers: this.api_report
        })
        .then(response => {
          this.$nuxt.$loading.finish()
        })
    },
    // Mostriamo il resport
    showReport() {
      const container = document.getElementById('quiz-container')

      container.innerHTML =
        '<p class="text-center mb-0">Hai risposto correttamente a ' +
        this.report.valid.length +
        ' domande su ' +
        this.total +
        '.</p>'
    },
    // Otteniamo il datetime corrente per salvare effettivamente la data in cui ha finito il quiz
    // Se non trasmessa WordPress salverà il datetime al momento del salvataggio
    getDateTime() {
      const today = new Date()
      const date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate()
      const time =
        today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()

      return date + ' ' + time
    }
  }
}
</script>
