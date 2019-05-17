<template>
  <header id="site-header" class="font-secondary">
    <nav class="navbar navbar-light bg-light vh-secondary">
      <nuxt-link to="/quiz" class="navbar-brand" title="Elenco Materie">
        <img src="/images/logo.png" alt="logo" />
      </nuxt-link>

      <nuxt-link
        v-if="display_name"
        to="/profilo/"
        class="user-display-name mr-3"
      >
        Ciao {{ display_name }}
      </nuxt-link>

      <a
        v-if="$store.state.login.auth"
        class="logout"
        title="Scollegati"
        @click="logout"
      >
        <img src="/images/log-out-button.png" alt="logo" />
      </a>
    </nav>
  </header>
</template>

<script>
import { mapState } from 'vuex'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  computed: mapState({
    // arrow functions can make the code very succinct!
    display_name: state =>
      state.currentUser.user_info
        ? state.currentUser.user_info.display_name
        : null
  }),
  methods: {
    logout() {
      Cookie.remove('user_info')
      Cookie.remove('auth')
      this.$store.commit('login/setAuth', null)
      this.$store.commit('currentUser/setUser', null)
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
#site-header {
  .navbar {
    img {
      max-height: 2.14285714rem;
      @media (max-width: 575.98px) {
        max-height: 1.78571429rem;
      }
    }
    a {
      color: #000;
      text-decoration: none;
    }
  }
}
</style>
