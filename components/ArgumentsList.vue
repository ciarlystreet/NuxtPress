<template>
  <div class="argument-list">
    <h1 v-if="title" class="text-center mb-3 font-secondary">{{ title }}</h1>

    <List :links="links" />
  </div>
</template>

<script>
/**
 * Importiamo i componenti
 */
import List from '~/components/List.vue'
export default {
  /**
   * Definiamo i componenti
   */
  components: {
    List
  },
  /**
   * Definiamo i dati reattivi
   */
  data() {
    return {
      title: 'Materie disponibili',
      links: []
    }
  },
  /**
   * Otteniamo i vari argomenti disponibili in maniera asincrona
   */
  async asyncData({ $axios, error, params }) {
    try {
      const { data } = await $axios.get(process.env.API_GET_ARGUMENTS)
      const links = []
      // Per ogni argomento del quiz creiamo un link da passare al componente "List"
      data.forEach(element => {
        const link = {
          href: element.slug, // Lo slug è l'informazione che abbiamo scelto di far utilizzare a vue route per generare i link dinamicamente: pages/quiz/quiz-per-argomento/_slug.vue
          title: element.name,
          label: element.name,
          count: element.count
        }
        links.push(link)
      })
      return {
        links
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
