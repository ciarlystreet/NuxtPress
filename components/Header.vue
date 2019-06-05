<template>
  <div>
    <header id="site-header" class="font-secondary">
      <nav class="navbar navbar-light bg-light vh-secondary">
        <nuxt-link to="/quiz" class="navbar-brand" title="Elenco Materie">
          <img src="/images/logo.png" alt="logo" />
        </nuxt-link>
        <no-ssr>
          <template v-if="displayName && isUserLoggedIn">
            <nuxt-link to="/quiz" class="user-display-name mr-3">
              <span class="align-middle"> Ciao {{ displayName }} 😍</span>
            </nuxt-link>
          </template>
        </no-ssr>
        <a
          v-if="isUserLoggedIn"
          class="logout"
          title="Scollegati"
          @click="logout"
        >
          <img src="/images/log-out-button.png" alt="logo" />
        </a>
      </nav>
    </header>
  </div>
</template>

<script>
import { SET_AUTH, SET_USER } from '~/store/auth'
import { mapGetters } from 'vuex'
export default {
  computed: {
    // Utilizziamo un getter per verificare se l'utente è loggato o meno
    ...mapGetters('auth', ['isUserLoggedIn', 'displayName'])
  },
  methods: {
    logout() {
      this.$store.commit(SET_AUTH, null)
      this.$store.commit(SET_USER, null)
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
