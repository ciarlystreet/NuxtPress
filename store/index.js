export const state = () => ({
  counter: 0
})

export const mutations = {
  increment(state) {
    state.counter++
  }
}

const cookieparser = process.server ? require('cookieparser') : undefined
export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let auth = null
    let user = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        auth = parsed.auth
        user = JSON.parse(parsed.user_info)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('login/setAuth', auth)
    commit('currentUser/setUser', user)
  }
}
