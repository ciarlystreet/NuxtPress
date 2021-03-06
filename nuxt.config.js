import axios from 'axios'
import pkg from './package'
const env = require('dotenv').config()

export default {
  mode: 'universal',
  env: env.parsed,

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Yeon+Sung|Permanent+Marker'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: '~/components/loading.vue',

  /*
   ** Global CSS
   */
  css: ['~/assets/scss/main.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/login.client.js', '~/plugins/js-helpers.client.js'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/dotenv'
  ],

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: process.env.WP_BASE_URL
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }
    }
  },
  /**
   * Configuriamo le route di nuxt in maniera tale
   * che generi le pagine statiche degli slug dinamici
   */
  generate: {
    // routes: function() {
    //   // eslint-disable-next-line no-console
    //   console.log(process.env.API_GET_ARGUMENTS)
    //   return axios
    //     .get(process.env.WP_BASE_URL + process.env.API_GET_ARGUMENTS)
    //     .then(res => {
    //       return res.data.map(argument => {
    //         return '/quiz/quiz-per-argomento/' + argument.slug
    //       })
    //     })
    //     .catch(res => {
    //       // eslint-disable-next-line no-console
    //       console.log(res.response)
    //     })
    // },
    routes: function() {
      return axios
        .get(process.env.WP_BASE_URL + process.env.API_GET_ARGUMENTS, {
          params: {
            include_questions: true,
            limit_questions: -1
          }
        })
        .then(res => {
          return res.data.map(argument => {
            return {
              route: '/quiz/quiz-per-argomento/' + argument.slug,
              payload: argument
            }
          })
        })
    }
  }
}
