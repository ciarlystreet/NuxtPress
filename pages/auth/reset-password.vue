<template>
  <div>
    <b-card id="form-login" header="Reset Password">
      <b-alert
        v-model="formMessageStatus"
        :variant="formMessageType"
        dismissible
      >
        <p class="mb-0" v-html="formMessage"></p>
      </b-alert>
      <b-button v-if="!show" :to="'/auth/login'" variant="info">Login</b-button>

      <b-card-text>
        <b-form v-if="show" @submit.prevent="onSubmit">
          <b-form-group
            v-if="!key"
            id="input-group-1"
            label="Email Address:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model.trim="form.email"
              type="email"
              placeholder="Insert your address e-mail"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            v-if="key"
            id="input-group-2"
            label="New Password:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model.trim="form.newPassword"
              type="text"
              placeholder="Insert a new password"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            v-if="key"
            id="input-group-3"
            label="New Password Confirm:"
            label-for="input-3"
          >
            <b-form-input
              id="input-3"
              v-model.trim="form.newPasswordConfirm"
              type="text"
              placeholder="Confirm a new password"
            ></b-form-input>
          </b-form-group>

          <input v-if="key" type="hidden" name="key" :value="key" />
          <input
            v-if="!key && appName"
            type="hidden"
            name="appName"
            :value="appName"
          />

          <b-button type="submit" variant="info">Reset</b-button>
          <b-button :to="'/auth/login'" variant="primary" class="text-white"
            >Login
          </b-button>
        </b-form>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        newPassword: '',
        newPasswordConfirm: ''
      },
      show: true,
      formMessageStatus: false,
      formMessage: 'asd',
      formMessageType: 'danger',
      key: this.$route.query.key,
      login: this.$route.query.login,
      appName: 'My app name'
    }
  },
  methods: {
    onSubmit() {
      const self = this
      self.formMessageStatus = false
      self.formMessage = ''
      self.$nuxt.$loading.start()

      // change password or token generation
      const endpoint = self.key
        ? process.env.API_RESET_PSW_ENDPOINT
        : process.env.API_RESET_PSW_TOKEN_ENDPOINT
      const data = self.key
        ? { key: self.key, login: self.login, newPass: self.form.newPassword }
        : {
            email: self.form.email,
            appRedirectionUrl: window.location.href,
            appName: self.appName
          }

      self.$axios
        .post(endpoint, data)
        .then(function(response) {
          self.$nuxt.$loading.finish()
          self.formMessage = response.data
          self.formMessageType = 'success'
          self.formMessageStatus = true
          self.show = false
        })
        .catch(function(error) {
          self.$nuxt.$loading.finish()
          const permittedErrors = [403, 500]
          if (
            error.request !== undefined &&
            permittedErrors.indexOf(error.request.status) !== -1
          ) {
            const responseObj = JSON.parse(error.request.response)
            self.formMessage = responseObj.message.replace(
              /<a\b[^>]*>(.*?)<\/a>/i,
              ''
            ) // Remove link
            self.formMessageType = 'danger'
            self.formMessageStatus = true
          } else {
            self.formMessage = 'Connection API error'
            self.formMessageType = 'danger'
            self.formMessageStatus = true
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
