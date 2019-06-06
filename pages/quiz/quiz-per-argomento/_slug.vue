<template>
  <section class="container-fluid">
    <h1 v-if="title" class="text-center mb-3 font-secondary">
      {{ title }}
    </h1>

    <answersList :quiz-details="quizDetails" />
  </section>
</template>

<script>
/**
 * Importiamo i componenti
 */
import answersList from '~/components/answersList.vue'
export default {
  /**
   * Definiamo i componenti
   * I dati che il componente si aspetta di ricevere
   */
  components: {
    answersList
  },
  /**
   * Definiamo i dati reattivi
   */
  data() {
    return {
      title: false,
      questions: [],
      argument: '',
      activeID: false,
      report: { valid: [], invalid: [] }
    }
  },
  /**
   * Otteniamo le "Computed Properties" che ci aiutano a mantenere più pulito il codice
   * nel caso in qui nel pomponente abbiamo bisogno di dati che sono ril risultato di una o più elaborazioni.
   */
  computed: {
    // Aggiungiamo ai dati lo slug dell'argomento corrente in quanto coincide con lo slug del termine di tassonomia su WordPress
    // Ci servirà, nel passagio successivo, quando andremo a pescarci tramite API i quiz apparteneti alla categoria corrente.
    slug() {
      return this.$route.params.slug
    }
  },
  /**
   * Otteniamo i quiz appartenti alla categoria corrente
   */
  async asyncData({ $axios, error, params }) {
    let title = null
    let quizDetails = null
    try {
      const { data } = await $axios.get(process.env.API_GET_QUIZ, {
        params: {
          argument: params.slug,
          orderby: 'rand',
          limit: 30
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
