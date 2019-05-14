<template>
  <div class="container text-center">
    <h1 v-if="error.statusCode === 404" class="font-secondary">
      Page not found
    </h1>
    <h1 v-else>An error occurred</h1>
    <nuxt-link to="/">Home page</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>
