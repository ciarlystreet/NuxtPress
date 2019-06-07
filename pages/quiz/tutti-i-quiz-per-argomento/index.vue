<template>
  <section class="container-fluid">
    <h1 v-if="title" class="text-center mb-3 font-secondary">{{ title }}</h1>

    <List :links="links" />
  </section>
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
   * Otteniamo tramite il metodo asyncData
   * Questo permette di gestire le operazioni asincrone prima di impostare i dati del componente.
   * Verrà chiamato lato server una volta (sulla prima richiesta all'app Nuxt) e lato client durante la navigazione verso ulteriori percorsi.
   *
   * A differenza del metodo fetch, rende direttamente disponibili al comenente i dati che ottiene
   */
  async asyncData({ $axios, error, params }) {
    try {
      const { data } = await $axios.get(process.env.API_GET_ARGUMENTS)
      const links = []
      data.forEach(element => {
        const link = {
          href: element.slug,
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
