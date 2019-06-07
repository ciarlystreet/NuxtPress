const _NAMESPACE = 'api_quiz'
const _GET_ARGUMENTS = 'get_arguments'
const _SET_ARGUMENTS = 'set_arguments'

export const NAMESPACE = _NAMESPACE
export const GET_ARGUMENTS = _NAMESPACE + '/' + _GET_ARGUMENTS
export const SET_ARGUMENTS = _NAMESPACE + '/' + _SET_ARGUMENTS

export const state = () => ({
  arguments: []
})

/**
 * Mutations
 * 
 * L'unico modo per cambiare effettivamente lo stato in un negozio Vuex è commettendo una mutazione.
 * Per richiamare un gestore di mutazione, dobbiamo chiamare store.commit
 * 
 * Esempio di utilizzo:
  methods: {
    onSubmit() {
      this.$store.commit('auth/setAuth', auth)
    }
  }
 */
export const mutations = {
  // salviamo gli argomenti del quiz
  [_SET_ARGUMENTS](state, quizArguments) {
    state.arguments = quizArguments
  }
}

/**
 * Actions
 */
export const actions = {
  // Ottenitamo gli argomenti del quiz
  async [_SET_ARGUMENTS]({ commit, error, params }) {
    try {
      const { data } = await this.$axios.get(process.env.API_GET_ARGUMENTS)
      const argumentsLinks = []
      // Per ogni argomento del quiz creiamo un link da passare al componente "List"
      data.forEach(element => {
        const link = {
          href: element.slug, // Lo slug è l'informazione che abbiamo scelto di far utilizzare a vue route per generare i link dinamicamente: pages/quiz/quiz-per-argomento/_slug.vue
          title: element.name,
          label: element.name,
          count: element.count
        }
        argumentsLinks.push(link)
      })

      commit(_SET_ARGUMENTS, argumentsLinks)
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch event #' + params.id
      })
    }
  }
}
