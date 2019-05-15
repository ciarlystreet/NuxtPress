<template>
  <div>
    <b-list-group v-if="links">
      <b-list-group-item
        v-for="(link, index) in links"
        :key="index"
        class="text-center"
      >
        <nuxt-link :to="link.href" :title="link.title">
          {{ link.label }}
        </nuxt-link>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  props: {
    links: {
      type: Array,
      required: true
    }
  }
}
</script>
