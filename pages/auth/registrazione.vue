<template>
  <div>
    <b-card id="form-login" header="Registration">
      <b-alert v-model="formError" variant="danger" dismissible>
        <p class="mb-0" v-html="formErrorMessage"></p>
      </b-alert>
      <b-card-text>
        <b-form v-if="show" @submit.prevent="onSubmit" @reset="onReset">
          <b-form-group
            id="input-group-1"
            label="Username:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.username"
              v-model.trim="form.username"
              type="text"
              placeholder="Inserici il tuo username"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Nome:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.firstname"
              v-model.trim="form.firstname"
              type="text"
              placeholder="Inserisci il tuo nome"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="Cognome:" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="form.lastname"
              v-model.trim="form.lastname"
              type="text"
              placeholder="Inserisci il tuo cognome"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-4" label="E-mail:" label-for="input-4">
            <b-form-input
              id="input-4"
              v-model="form.email"
              v-model.trim="form.email"
              type="email"
              placeholder="Inserisci il tuo indirizzo e-mail"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-5"
            label="Password:"
            label-for="input-5"
          >
            <b-form-input
              id="input-5"
              v-model.trim="form.password"
              v-model="form.password"
              type="password"
              placeholder="Inserisci la tua password"
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="info">Registrati</b-button>
          <b-button type="reset" variant="danger">Resetta</b-button>
          <b-button :to="'/auth/login'" variant="primary" class="text-white"
            >Accedi
          </b-button>
        </b-form>
      </b-card-text>
    </b-card>
  </div>
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
      show: true,
      formError: false,
      formErrorMessage: ''
    }
  },
  middleware: 'notAuthenticated',
  beforeCreate() {
    // Check if user is logged in on page refresh
    if (process.client) {
      this.$nextTick(() => {
        this.$nuxt.$loading.start()
        if (
          process.client &&
          Cookie.get('auth') !== null &&
          Cookie.get('auth') !== undefined
        ) {
          this.$router.push(process.env.LOGGED_IN_USER_REDIRECT)
        } else {
          this.show = true
        }
        this.$nuxt.$loading.finish()
      })
    }
  },
  methods: {
    onSubmit() {
      const self = this
      self.formError = false
      self.formErrorMessage = ''
      self.$nuxt.$loading.start()
      self.$axios
        .post(process.env.API_REGISTRATION_ENDPOINT, {
          email: self.form.email,
          username: self.form.username,
          firstname: self.form.firstname,
          lastname: self.form.lastname,
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

            self.$router.push(process.env.LOGGED_IN_USER_REDIRECT)
          }
        })
        .catch(function(error) {
          self.$nuxt.$loading.finish()
          if (error.request !== undefined && error.request.status === 403) {
            const responseObj = JSON.parse(error.request.response)
            self.formErrorMessage = responseObj.message.replace(
              /<a\b[^>]*>(.*?)<\/a>/i,
              ''
            ) // Remove link
            self.formError = true
          } else {
            self.formErrorMessage = 'Connection API error'
            self.formError = true
          }
        })
    },
    onReset() {
      // Reset our form values
      this.form.username = ''
      this.form.firstname = ''
      this.form.lastname = ''
      this.form.email = ''
      this.form.password = ''
      this.formError = false
      this.formErrorMessage = ''
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
