const _NAMESPACE = 'auth'
const _SET_AUTH = 'auth'
const _SET_USER = 'setUser'

export const NAMESPACE = _NAMESPACE
export const SET_AUTH = _NAMESPACE + '/' + _SET_AUTH
export const SET_USER = _NAMESPACE + '/' + _SET_USER

export const state = () => ({
  auth: null,
  user_info: null
})

/**
 * L'unico modo per cambiare effettivamente lo stato in un negozio Vuex è commettendo una mutazione.
 * Per richiamare un gestore di mutazione, devi chiamare store.commit
 * 
 * Esempio di utilizzo:
  methods: {
    onSubmit() {
      this.$store.commit('auth/setAuth', auth)
    }
  }
 */
const Cookie = process.client ? require('js-cookie') : undefined
export const mutations = {
  [_SET_AUTH](state, auth) {
    state.auth = auth
    if (auth === null) {
      Cookie.remove('auth', auth)
    } else {
      Cookie.set('auth', auth)
    }
  },
  [_SET_USER](state, user) {
    state.user_info = user
    if (user === null) {
      Cookie.remove('user_info', user)
    } else {
      Cookie.set('user_info', user)
    }
  }
}

/**
 * I Getter permettono di calcolare lo stato derivato in base allo stato del negozio
 * Si possono considerare come proprietà calcolate per i negozi.
 * Come le proprietà calcolate, il risultato di un getter viene memorizzato nella cache
 * in base alle sue dipendenze e verrà rivalutato solo quando alcune delle sue dipendenze sono state modificate.
 * 
 * Esempio di utilizzo:
 * 
  computed: {
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn
    }
  }
 */
export const getters = {
  isUserLoggedIn: state => {
    return state.auth !== null
  },
  displayName: state => {
    const displayName =
      state.user_info !== null && state.user_info.display_name
        ? state.user_info.display_name
        : false
    return displayName
  }
}
