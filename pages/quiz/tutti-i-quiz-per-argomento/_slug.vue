<template>
  <section class="container-fluid">
    <h1 v-if="title" class="text-center mb-3 font-secondary">
      {{ title }}
    </h1>

    <answersList :question-details="questionDetails" />
  </section>
</template>

<script>
import answersList from '~/components/answersList.vue'
export default {
  middleware: 'authenticated',
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
    try {
      const { data } = await $axios.get('/wp-json/nuxt/v1/quiz', {
        params: {
          argument: params.slug,
          orderby: 'rand',
          limit: 5
        },
        useCache: true
      })
      return {
        title: data.question.title,
        questionDetails: data
      }
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch event #' + params.id
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
