<template>
  <header id="site-header" class="font-secondary">
    <nav class="navbar navbar-light bg-light vh-secondary">
      <nuxt-link to="/" class="navbar-brand" title="Elenco Materie">
        <img src="~assets/images/logo.png" alt="logo" />
      </nuxt-link>

      <nuxt-link to="/profilo/" class="user-display-name mr-3">
        Ciao The Pear
      </nuxt-link>

      <nuxt-link to="/logout" class="logout" title="Scollegati">
        <img src="~assets/images/log-out-button.png" alt="logo" />
      </nuxt-link>
    </nav>
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
#site-header {
  .navbar {
    img {
      max-height: 2.14285714rem;
      @media (max-width: 575.98px) {
        max-height: 1.78571429rem;
      }
    }
    a {
      color: #000;
      text-decoration: none;
    }
  }
}
</style>
