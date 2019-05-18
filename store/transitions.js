export const state = () => ({
  transition: null,
  duration: 300, // $transition-duration
  bounceDuration: 600 // $bonuce-duration
})

export const mutations = {
  activate(state, transition) {
    const appContainer = document.getElementById('app-container')
    const duration =
      transition === 'bounce' ? state.bounceDuration / 2 : state.duration

    appContainer.classList.add(
      transition + '-leave-active',
      transition + '-leave-to'
    )
    setTimeout(function() {
      appContainer.classList.remove(
        transition + '-leave-active',
        transition + '-leave-to'
      )
      appContainer.classList.add(
        transition + '-enter-active',
        transition + '-enter-to'
      )
      setTimeout(function() {
        appContainer.classList.remove(
          transition + '-enter-active',
          transition + '-enter-to'
        )
      }, duration)
    }, duration)

    state.transition = transition
  }
}
