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
        @click="nextQuestion(question, answer)"
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
export default {
  props: {
    questionDetails: {
      type: Object,
      required: true
    }
  },
  data() {
    // eslint-disable-next-line no-console
    console.log(this.questionDetails)
    return {
      questions: this.questionDetails.items,
      argument: this.questionDetails.question,
      total: this.questionDetails.items.length,
      activeID: this.questionDetails.items[0].ID,
      count: 1,
      report: { valid: [], invalid: [] },
      showContinueBtn: false
    }
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
      // eslint-disable-next-line no-console
      console.log(currentAnswer)
      if (!currentAnswer) return false
      const report = {
        question: question.question,
        answer: answer.text
      }

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
        .post('/wp-api/saveuserstats', {
          params: {
            argument: this.$route.params.slug,
            report: this.report,
            userID: 1
          },
          useCache: false
        })
        .then(response => {
          this.$nuxt.$loading.finish()
          // eslint-disable-next-line no-console
          console.log(response)
        })
    },
    showReport() {
      const container = document.getElementById('quiz-container')

      container.innerHTML =
        '<h1 class="text-center mb-3 font-secondary">' +
        this.argument.name +
        '</h1>'
      container.innerHTML +=
        'Hai risposto correttamente a ' +
        this.report.valid.length +
        ' domande su ' +
        this.total +
        '.'
    }
  }
}
</script>
