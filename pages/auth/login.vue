<template>
  <b-card id="form-login" header="Accedi">
    <b-card-text>
      <b-form v-if="show" @submit.prevent="onSubmit" @reset="onReset">
        <b-form-group
          id="input-group-1"
          label="Indirizzo Email:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            placeholder="Insierisci il tuo indirizzo email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Password:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model.trim="form.password"
            v-model="form.password"
            type="password"
            placeholder="Insierisci la tua password"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="info">Invia</b-button>
        <b-button type="reset" variant="danger">Resetta</b-button>
        <b-button
          :to="'/auth/registrazione'"
          variant="primary"
          class="text-white"
          >Registrati
        </b-button>
      </b-form>
    </b-card-text>
  </b-card>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      show: true
    }
  },
  middleware: 'notAuthenticated',
  methods: {
    onSubmit() {
      const self = this
      self.$nuxt.$loading.start()
      self.$axios
        .post('/wp-json/jwt-auth/v1/token', {
          username: self.form.email,
          password: self.form.password
        })
        .then(function(response) {
          self.$nuxt.$loading.finish()
          if (response.data.token) {
            const auth = response.data.token
            self.$store.commit('login/setAuth', auth)
            Cookie.set('auth', auth)

            const user = response.data.user
            self.$store.commit('currentUser/setUser', user)
            Cookie.set('user_info', user)
            self.$router.push('/quiz')
          }
        })
        .catch(function(error) {
          self.$nuxt.$loading.finish()
          if (error.request !== undefined && error.request.status === 403) {
            // eslint-disable-next-line no-console
            console.error(JSON.parse(error.request.response))
          }
        })
    },
    onReset() {
      // Reset our form values
      this.form.email = ''
      this.form.password = ''
      this.form.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
