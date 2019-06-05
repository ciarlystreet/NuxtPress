<template>
  <div>
    <b-card v-if="show" header="Benvenuto">
      <b-card-text>
        <div v-if="isUserLoggedIn">
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
  </div>
</template>

<script>
import { SET_AUTH, SET_USER } from '~/store/auth'
import { mapGetters } from 'vuex'
export default {
  meta: {
    loggedIn: false
  },
  data() {
    return {
      show: true
    }
  },
  computed: {
    // Utilizziamo un getter per verificare se l'utente è loggato o meno
    ...mapGetters('auth', ['isUserLoggedIn'])
  },
  methods: {
    // Metodo per sloggare l'utente
    logout() {
      // Aggiorniamo le info nello store
      this.$store.commit(SET_AUTH, null)
      this.$store.commit(SET_USER, null)
    }
  }
}
</script>
