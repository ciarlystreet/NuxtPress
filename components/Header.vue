<template>
  <div>
    <!-- [no-ss] To skip error: The client-side rendered virtual DOM tree is not matching server-rendered content -->
    <header id="site-header" class="font-secondary">
      <nav class="navbar navbar-light bg-light vh-secondary">
        <nuxt-link to="/quiz" class="navbar-brand" title="Elenco Materie">
          <img src="/images/logo.png" alt="logo" />
        </nuxt-link>
        <no-ssr>
          <template v-if="display_name && is_user_logged_in">
            <nuxt-link to="/quiz" class="user-display-name mr-3">
              <span class="align-middle"> Ciao {{ display_name }} </span>
              <emoji
                emoji="heart_eyes"
                set="emojione"
                :size="20"
                class="align-middle"
              />
            </nuxt-link>
          </template>
        </no-ssr>
        <a
          v-if="is_user_logged_in"
          class="logout"
          title="Scollegati"
          @click="logout"
        >
          <img src="/images/log-out-button.png" alt="logo" />
        </a>
      </nav>
    </header>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Emoji } from 'emoji-mart-vue'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  components: {
    Emoji
  },
  computed: {
    ...mapState({
      // arrow functions can make the code very succinct!
      display_name({ currentUser }) {
        // eslint-disable-next-line no-console
        console.log(currentUser)
        const name =
          currentUser && currentUser.user_info
            ? ' ' + currentUser.user_info.display_name
            : ''

        return name
      },
      is_user_logged_in({ login }) {
        return login.auth
      }
    })
  },
  methods: {
    logout() {
      Cookie.remove('user_info')
      Cookie.remove('auth')
      this.$store.commit('login/setAuth', null)
      this.$store.commit('currentUser/setUser', null)
      this.$router.push('/')
    }
  }
}
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
