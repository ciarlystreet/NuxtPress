<template>
  <div v-if="show">
    <pre>{{ isUserLoggedIn }}</pre>
    <b-card id="form-login" header="Login">
      <b-alert v-model="formError" variant="danger" dismissible>
        <p class="mb-0" v-html="formErrorMessage"></p>
      </b-alert>
      <b-card-text>
        <b-form @submit.prevent="onSubmit" @reset="onReset">
          <b-form-group
            id="input-group-1"
            label="Email Address:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.email"
              v-model.trim="form.email"
              type="email"
              placeholder="Insert your address e-mail"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Password:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model.trim="form.password"
              v-model="form.password"
              type="password"
              placeholder="Insert your password"
            ></b-form-input>
          </b-form-group>

          <nuxt-link class="mb-4 d-block" :to="'/auth/reset-password'"
            >Lost your password?</nuxt-link
          >

          <b-button type="submit" variant="info">Send</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
          <b-button
            :to="'/auth/registration'"
            variant="primary"
            class="text-white"
            >Registration
          </b-button>
        </b-form>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { SET_AUTH, SET_USER } from '~/store/auth'
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
  computed: {
    // Utilizziamo un getter per verificare se l'utente è loggato o meno
    ...mapGetters('auth', ['isUserLoggedIn'])
  },
  methods: {
    onSubmit() {
      const self = this
      self.$nuxt.$loading.start()
      self.formError = false
      self.formErrorMessage = ''
      self.$axios
        .post(process.env.API_TOKEN_ENDPOINT, {
          username: self.form.email,
          password: self.form.password
        })
        .then(function(response) {
          self.$nuxt.$loading.finish()
          if (response.data.token) {
            const auth = response.data.token
            self.$store.commit(SET_AUTH, auth)

            const user = response.data.user
            self.$store.commit(SET_USER, user)

            self.$router.push(process.env.LOGGED_IN_USER_REDIRECT)
            // self.$router.back()
          }
        })
        .catch(function(error) {
          self.$nuxt.$loading.finish()
          if (error.request !== undefined && error.request.status === 403) {
            const responseObj = JSON.parse(error.request.response)
            self.formErrorMessage = responseObj.message.replace(
              /<a\b[^>]*>(.*?)<\/a>/i,
              ''
            ) // Remove Link
            self.formError = true
          } else {
            self.formErrorMessage = 'Connection API error'
            self.formError = true
          }
        })
    },
    onReset() {
      // Reset our form values
      this.form.email = ''
      this.form.password = ''
      this.formError = false
      this.formErrorMessage = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
        this.formError = false
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
