<template>
  <footer id="site-footer" class="font-secondary">
    <b-container class="text-center">
      <b-row class="vh-secondary" align-v="center">
        <div id="quiz-timer" class="col text-left"></div>

        <b-col class="text-center">
          © 2019
        </b-col>

        <div class="col text-right">
          <b-spinner
            v-if="loading"
            variant="primary"
            type="grow"
            label="Caricamento..."
          ></b-spinner>
        </div>
      </b-row>
    </b-container>
  </footer>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      loading({ loading }) {
        return loading.status
      }
    })
  }
}
</script>
