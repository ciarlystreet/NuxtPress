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
import { mapState } from 'vuex'
import { NAMESPACE, SET_ARGUMENTS } from '~/store/api_quiz'
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
      title: 'Materie disponibili'
    }
  },
  computed: {
    // Utilizziamo un getter per ottenere gli argomenti del quiz precedentemente scaricati tramite fetch (vedi sotto)
    ...mapState(NAMESPACE, { links: state => state.arguments })
  },
  /**
   * Otteniamo i vari argomenti disponibili tramite fetch
   * Questo permette di scaricare i contenuti solo al primo accesso alla pagina (dev)
   * o addirittura averli già disponibili (generate)
   *
   * Il fetch non rende disponibili i dati che riceve al componente pertanto salviamo il riultato nello store Vuex
   */
  async fetch({ store, params }) {
    if (!store.state.api_quiz.arguments.length)
      await store.dispatch(SET_ARGUMENTS)
  }
}
</script>
