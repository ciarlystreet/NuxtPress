<template>
  <section class="container-fluid">
    <h1 v-if="title" class="text-center mb-3 font-secondary">
      {{ title }}
    </h1>

    <answersList :quiz-details="quizDetails" />
  </section>
</template>

<script>
import answersList from '~/components/answersList.vue'
export default {
  components: {
    answersList
  },
  data() {
    return {
      title: false,
      questions: [],
      argument: '',
      activeID: false,
      report: { valid: [], invalid: [] }
    }
  },
  computed: {
    slug() {
      return this.$route.params.slug
    }
  },
  async asyncData({ $axios, error, params }) {
    let title = null
    let quizDetails = null
    try {
      const { data } = await $axios.get(process.env.API_GET_QUIZ, {
        params: {
          argument: params.slug,
          orderby: 'rand',
          limit: -1
        }
      })
      title = data.argument.name
      quizDetails = data
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch event #' + params.id
      })
    }
    return {
      title,
      quizDetails
    }
  }
}
</script>

<style lang="scss" scoped></style>
