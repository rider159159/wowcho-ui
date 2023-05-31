<script setup lang="ts">
const props = defineProps({
  link: {
    type: String,
    default: '#'
  },
  imageLink: {
    type: String
  },
  imageAlt: {
    type: String
  }
})
</script>

<template>
  <a class="w-full" :href="props.link">
    <img class="max-w-full h-auto" :src="props.imageLink" :alt="props.imageAlt">
  </a>
</template>
