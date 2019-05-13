<template>
  <section class="container-fluid">
    <h1 v-if="title" class="text-center mb-3 font-secondary">{{ title }}</h1>

    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3">
          <List :links="links" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import List from '~/components/List.vue'
export default {
  components: {
    List
  },
  data() {
    return {
      title: 'Materie disponibili',
      links: []
    }
  },
  async asyncData({ $axios, error, params }) {
    try {
      const { data } = await $axios.get('/wp-json/nuxt/v1/arguments')
      const links = []
      data.forEach(element => {
        const link = {
          href: element.slug,
          title: element.name,
          label: element.name
        }
        links.push(link)
      })

      return {
        links
      }
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch event #' + params.id
      })
    }
  }
}
</script>
