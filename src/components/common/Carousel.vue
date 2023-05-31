<script setup lang="ts">
const props = defineProps({
  list: {
    type: Array,
    default: () => [111111, 222222, 333333, 444444]
  }
})
</script>

<template>
  <Swiper
    :space-between="24"
    :centered-slides="true"
    :loop="true"
    :grab-cursor="true"
    :initial-slide="0"
    :watch-slides-progress="true"
    :autoplay="{
      delay: 2000,
      disableOnInteraction: false,
    }"
    :pagination="{
      clickable: true,
    }"
    navigation
    :modules="[Autoplay, Pagination]"
    v-bind="$attrs"
  >
    <SwiperSlide v-for="(item, index) in props.list" :key="index" class="swiper-slide">
      <!-- 等卡片好了之後放入 -->
      <CarouselCard imageLink="/test.webp" />
      <!-- <div class="h-300px flex justify-center items-center">{{ item }}</div> -->
    </SwiperSlide>
  </Swiper>
</template>

<style lang="scss" scoped>
.swiper-slide {
  @apply max-w-sm mx-auto max-w-none h-286px;
}
</style>
