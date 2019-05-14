<template>
  <section class="container-fluid">
    <h1 v-if="title" class="text-center mb-3 font-secondary">
      {{ title }}
    </h1>

    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3">
          <answersList :question-details="questionDetails" />
        </div>
      </div>
    </div>
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
