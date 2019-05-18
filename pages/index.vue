<template>
  <div>
    home
  </div>
</template>

<script>
export default {
  fetch({ params, redirect }) {
    redirect(301, '/home')
  }
}
</script>
