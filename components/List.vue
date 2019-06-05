<template>
  <div>
    <b-list-group v-if="links">
      <b-list-group-item
        v-for="(link, index) in links"
        :key="index"
        :to="link.disabled ? '' : link.href"
        :title="link.title"
        class="text-center bg-light"
      >
        <h2 class="h4 mb-0">
          {{ link.label }}
          <b-badge v-if="link.count" class="text-white">{{
            link.count
          }}</b-badge>
        </h2>
        <p v-if="link.desc" class="mb-0">{{ link.desc }}</p>
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
