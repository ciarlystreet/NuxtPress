export const state = () => ({
  status: null
})

export const mutations = {
  updateStatus(state, status) {
    state.status = status
  }
}
