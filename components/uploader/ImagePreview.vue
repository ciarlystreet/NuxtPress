<template>
  <b-img v-show="show && image" thumbnail fluid :src="image"></b-img>
</template>

<script>
export default {
  name: 'ImagePreview',
  data() {
    return {
      show: false
    }
  },
  computed: {
    image() {
      return this.$store.state.image_preview.image
    }
  },
  watch: {
    image: function(newVal, oldVal) {
      this.show = true
    }
  },
  mounted() {
    if (this.image && this.image.match(/http/)) {
      this.show = true
    }
  }
}
</script>
