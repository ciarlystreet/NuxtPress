<template>
  <section class="container">
    <div>
      <h1 class="title">
        Profilo
      </h1>
      <b-card class="text-left">
        <h5>Imagine Profilo</h5>
        <b-form ref="form" @submit.prevent="newPhoto">
          <b-form-group label="E-mail">
            <b-form-input v-model="email" type="email"></b-form-input>
          </b-form-group>
          <image-preview></image-preview>
          <uploader v-model="photo" @presigned="photo_data = $event"></uploader>
          <b-btn type="submit" variant="primary">Aggiorna</b-btn>
        </b-form>
      </b-card>
    </div>
  </section>
</template>

<script>
import uploader from '~/components/uploader/uploader.vue'
import ImagePreview from '~/components/uploader/ImagePreview.vue'

export default {
  components: {
    uploader,
    ImagePreview
  },
  data() {
    return {
      photo: null,
      photo_data: null,
      email: null
    }
  },
  methods: {
    newPhoto() {
      this.$axios
        .post('/wp-json/jwt-auth/v1/updateuser', {
          widget: {
            photo_data: this.photo_data,
            email: this.email
          }
        })
        .then(resp => {
          if (resp.status === 201) {
            alert('success!')
            this.$refs.form.reset()
            this.$store.commit('image_preview/set', null)
          }
        })
    }
  }
}
</script>
