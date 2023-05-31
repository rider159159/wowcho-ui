<script setup lang="ts">
import { Autoplay, Pagination } from 'swiper'

const props = defineProps({
  list:<any> {
    type: Array,
    default: () => [111111, 222222, 333333, 444444]
  }
})
const swiper:any = ref(null)
function getRef (swiperInstance:any) {
  swiper.value = swiperInstance
}

</script>

<template>
  <section class="relative w-full z-0">
    <Swiper
      :space-between="24"
      :slides-per-view="3"
      :centered-slides="true"
      :loop="true"
      :grab-cursor="true"
      :initial-slide="0"
      :watch-slides-progress="true"
      :autoplay="{
        delay: 200000,
        disableOnInteraction: false,
      }"
      :pagination="{
        clickable: true,
      }"
      :modules="[Autoplay, Pagination]"
      @swiper="getRef"
      v-bind="$attrs"
    >
    <!-- Manipulation -->
      <SwiperSlide v-for="(item, index) in props.list" :key="index" class="swiper-slide !h-400px">
        <!-- 等卡片好了之後放入 -->
        <img :src="item.image" alt="" class="w-full h-full object-cover	">
      </SwiperSlide>
    </Swiper>
    <img @click="swiper.slidePrev()" class="absolute left-[calc(33%-24px)] top-[calc(50%-24px)] z-10 cursor-pointer" src="/carousel/prev.svg">
    <img @click="swiper.slideNext()" class="absolute right-[calc(33%-24px)] top-[calc(50%-24px)] z-10 cursor-pointer" src="/carousel/next.svg">
  </section>
</template>

<style lang="scss" scoped>
.swiper-slide {
  @apply max-w-sm mx-auto max-w-none h-286px;
}
</style>
