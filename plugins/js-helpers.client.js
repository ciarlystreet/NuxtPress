import Vue from 'vue'
Vue.mixin({
  methods: {
    // use into 'async function' with 'await this.sleep(200)'
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
  }
})
