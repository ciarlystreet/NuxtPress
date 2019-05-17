<template>
  <b-card
    img-src="/images/quiz-time.png"
    img-alt="Card image"
    img-top
    header="Benvenuto"
  >
    <b-card-text>
      <div v-if="$store.state.login.auth">
        Hai già effettuato l'accesso
        <button @click="logout">
          Logout
        </button>
      </div>
      <div v-else>
        <p>
          Per poter accedere ai quiz occorre essere utenti registrati. Cosa
          aspetti? Registrarsi è semplice. Imparare sarà più semplice del
          previsto, ti daremo gli strumenti per non mollare, sarà un gioco da
          ragazzi vedrai!
        </p>
        <nuxt-link to="auth/login">Accedi</nuxt-link> |
        <nuxt-link to="/auth/registrazione">Registrati</nuxt-link>
      </div>
    </b-card-text>
  </b-card>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  methods: {
    logout() {
      Cookie.remove('user_info')
      Cookie.remove('auth')
      this.$store.commit('login/setAuth', null)
      this.$store.commit('currentUser/setUser', null)
    }
  }
}
</script>
