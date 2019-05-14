<template>
  <div>
    <div v-if="$store.state.login.auth">
      Hai già effettuato l'accesso
      <button @click="logout">
        Logout
      </button>
    </div>
    <p v-else>
      Accedi
      <NuxtLink to="/auth/login"> login </NuxtLink>.
    </p>
  </div>
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
