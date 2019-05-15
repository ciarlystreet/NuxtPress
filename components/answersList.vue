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
        <h5 class="card-header">
          {{ question.question }}
        </h5>

        <div class="list-group">
          <button
            v-for="(answer, answerIndex) in question.answers"
            :id="'question-' + question.ID + '-answer-' + answer.id"
            :key="answerIndex"
            class="list-group-item list-group-item-action btn-answer"
            @click="validateAnswer(question, answer)"
          >
            {{ answer.text }}<br />
            {{ answer.is_valid }}
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
        class="btn btn-primary ml-auto mr-auto mt-3 w-100"
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
import { mapState } from 'vuex'
export default {
  props: {
    quizDetails: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      count: 1,
      report: { valid: [], invalid: [] },
      api_report: [],
      showContinueBtn: false,
      activeID: this.quizDetails.questions[0].ID
    }
  },
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
    ...mapState({
      // arrow functions can make the code very succinct!
      user_id: state =>
        state.currentUser.user_info ? state.currentUser.user_info.ID : null
    })
  },
  methods: {
    disableAnswersBtn() {
      document.querySelectorAll('.btn-answer').forEach(item => {
        item.disabled = true
      })
    },
    enableAnswersBtn() {
      document.querySelectorAll('.btn-answer').forEach(item => {
        item.disabled = false
      })
    },
    validateAnswer(question, answer) {
      this.disableAnswersBtn()
      const currentAnswer = document.getElementById(
        'question-' + question.ID + '-answer-' + answer.id
      )
      if (!currentAnswer) return false
      const report = {
        question: question.question,
        answer: answer.text
      }
      const apiReport = {
        question_id: question.id,
        answer_id: answer.id,
        is_valid: answer.is_valid
      }
      this.api_report.push(apiReport)

      if (answer.is_valid) {
        currentAnswer.classList.add('bg-success', 'text-light')
        this.report.valid.push(report)
        this.nextQuestion(question, answer)
      } else {
        currentAnswer.classList.add('bg-danger', 'text-light')
        question.answers.forEach(item => {
          if (item.is_valid)
            document
              .getElementById('question-' + question.ID + '-answer-' + item.id)
              .classList.add('bg-success', 'text-light')
        })

        this.showContinueBtn = true

        this.report.invalid.push(report)
      }
    },
    nextQuestion(question, answer) {
      this.enableAnswersBtn()
      this.showContinueBtn = false
      const nextElement = document.getElementById('question-' + question.ID)
        .nextSibling
      const questionElement =
        nextElement &&
        nextElement.classList &&
        nextElement.classList.contains('quiz-question')
          ? nextElement
          : false

      if (questionElement) {
        this.count++
        this.activeID = questionElement.getAttribute('data-id')
      } else {
        this.saveUserStats()
        this.showReport()
      }
    },
    saveUserStats() {
      this.$nuxt.$loading.start()
      this.$axios
        .post('/wp-json/nuxt/v1/saveuserstats', {
          params: {
            user_id: this.user_id,
            argument_id: this.argument.term_id,
            answers: this.api_report
          }
        })
        .then(response => {
          this.$nuxt.$loading.finish()
        })
    },
    showReport() {
      const container = document.getElementById('quiz-container')

      container.innerHTML =
        'Hai risposto correttamente a ' +
        this.report.valid.length +
        ' domande su ' +
        this.total +
        '.'
    }
  }
}
</script>
