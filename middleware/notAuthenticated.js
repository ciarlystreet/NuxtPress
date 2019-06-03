export default function({ store, redirect, env }) {
  // If the user is authenticated redirect to home page
  if (store.state.login.auth !== null) {
    return redirect(env.LOGGED_IN_USER_REDIRECT)
  }
}
