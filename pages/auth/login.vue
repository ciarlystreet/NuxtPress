<template>
  <div class="mx-auto">
    <b-form v-if="show" @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Insierisci il tuo indirizzo email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-1" label="Passowrd:" label-for="input-1">
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          required
          placeholder="Insierisci la tua password"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4">
        <b-form-checkbox-group id="checkboxes-4" v-model="form.checked">
          <b-form-checkbox value="me">Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
        checked: []
      },
      show: true
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      const $this = this
      this.$axios
        .post('/wp-json/jwt-auth/v1/token', {
          username: this.form.email,
          password: this.form.password
        })
        .then(function(response) {
          // eslint-disable-next-line no-console
          console.log(response)
          if (response.data.token) {
            localStorage.setItem('loginToken', response.data.token)
            $this.$router.push('/')
          }
        })
        .catch(function(error) {
          // eslint-disable-next-line no-console
          console.log(error.request)
        })
    },
    onReset(evt) {
      evt.preventDefault()
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
