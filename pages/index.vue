<template>
  <b-card v-if="show" header="Benvenuto">
    <b-card-text>
      <div v-if="is_user_logged_in">
        Hai già effettuato l'accesso
        <button class="btn btn-secondary text-white" @click="logout">
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
        <nuxt-link to="auth/login" class="btn btn-info">Accedi</nuxt-link> |
        <nuxt-link
          to="/auth/registrazione"
          class="btn btn-secondary text-white"
        >
          Registrati
        </nuxt-link>
      </div>
    </b-card-text>
  </b-card>
</template>

<script>
import { mapState } from 'vuex'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  data() {
    return {
      show: true
    }
  },
  computed: {
    ...mapState({
      is_user_logged_in({ login }) {
        return login && login.auth !== null ? "'" + login.auth + "'" : false
      }
    })
  },
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
