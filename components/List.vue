<template>
  <div>
    <b-list-group v-if="links">
      <b-list-group-item
        v-for="(link, index) in links"
        :key="index"
        :to="link.href"
        :title="link.title"
        class="text-center"
      >
        {{ link.label }}
        <sup v-if="link.count">{{ link.count }}</sup>
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
