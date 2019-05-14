export const state = () => ({
  user_info: null
})

export const mutations = {
  setUser(state, user) {
    state.user_info = user
  }
}
