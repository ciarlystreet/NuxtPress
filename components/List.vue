<template>
  <div>
    <b-list-group v-if="links">
      <b-list-group-item
        v-for="(link, index) in links"
        :key="index"
        :href="link.href"
        :title="link.title"
        class="text-center"
      >
        {{ link.label }}
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
