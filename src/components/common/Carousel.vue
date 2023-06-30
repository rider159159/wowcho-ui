<script setup lang="ts">
import { Autoplay, Pagination } from 'swiper'

interface IList {
  image: string
  customizedUrl: string
}

interface Props {
  list?: IList[]
}

const props = withDefaults(defineProps<Props>(), {
  list: () => [{ image: '', customizedUrl: '' }]
})

const swiper:any = ref(null)
function getRef (swiperInstance:any) {
  swiper.value = swiperInstance
}

</script>

<template>
  <section class="relative w-full z-0">

    <Swiper
      :grab-cursor="true"
      :initial-slide="0"
      :watch-slides-progress="true"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
      }"
      :pagination="{
        dynamicBullets: true,
      }"
      :modules="[Autoplay, Pagination]"
      :slides-per-view="1"
      :space-between="10"
      :breakpoints="{
        '1024': {
          slidesPerView: 3,
          spaceBetween:24,
          },
        }"

      @swiper="getRef"
      class="relative z-0"
    >
    <!-- Manipulation -->
      <SwiperSlide v-for="(item, index) in props.list" :key="index" class="swiper-slide">
        <RouterLink :to="`/proposal/${item.customizedUrl}`" class="w-full">
          <img :src="item.image" class="w-full aspect-video object-cover object-cover cursor-pointer">
        </RouterLink>
      </SwiperSlide>
    </Swiper>
    <img @click="swiper.slidePrev()" class="z-10 absolute left-24px lg:left--72px top-[calc(50%-24px)] z-10 cursor-pointer" src="/carousel/prev.svg">
    <img @click="swiper.slideNext()" class="z-10 absolute right-24px lg:right--72px top-[calc(50%-24px)] z-10 cursor-pointer" src="/carousel/next.svg">
  </section>
</template>

<style lang="scss" scoped>
.swiper-slide {
  @apply max-w-sm mx-auto max-w-none;
}
</style>
