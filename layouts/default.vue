<template>
  <div>
    <Header />
    <main class="d-flex align-items-center vh-primary">
      <nuxt />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  }
}
</script>
