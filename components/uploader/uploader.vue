<template>
  <b-form-group>
    <b-form-file
      ref="file"
      v-model="file"
      :state="Boolean(file)"
      placeholder="Choose a file..."
      :accept="accept"
      @input="sendFile"
    ></b-form-file>
    <b-progress
      v-show="uploadPercentage > 0 && uploadPercentage !== 100"
      striped
      animated
      :max="100"
      class="mt-3"
      :value="uploadPercentage"
    ></b-progress>
  </b-form-group>
</template>
<script>
export default {
  props: {
    accept: {
      type: String,
      default: 'image/*'
    },
    apiUrl: {
      type: String,
      default: '/uploads'
    }
  },
  data() {
    return {
      file: null,
      presigned: {},
      uploadPercentage: 0
    }
  },
  methods: {
    sendFile() {
      const vm = this
      const formData = new FormData()
      formData.append('upload[file]', vm.file)
      this.$axios
        .post(vm._props.apiUrl, formData, {
          onUploadProgress: function(progressEvent) {
            this.$nuxt.$loading.start()
            vm.$emit('uploading')
            vm.uploadPercentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            )
          }
        })
        .then(resp => vm.$emit('presigned', resp.data))
        .catch(function(errors) {
          // eslint-disable-next-line no-console
          console.error(errors)
        })
        .finally(resp => {
          this.$nuxt.$loading.finish()
          vm.$emit('done')
        })
      this.toDataUrl()
    },
    toDataUrl() {
      const vm = this
      const reader = new FileReader()
      reader.addEventListener(
        'load',
        function() {
          const dataUrl = reader.result
          vm.$emit('image', dataUrl)
          vm.$store.commit('image_preview/set', dataUrl)
        },
        false
      )
      if (/\.(jpe?g|png|gif)$/i.test(vm.file.name)) {
        reader.readAsDataURL(vm.file)
      }
    }
  }
}
</script>
