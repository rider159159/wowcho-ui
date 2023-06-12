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
      <SwiperSlide v-for="(item, index) in props.list" :key="index" class="swiper-slide">
        <!-- 等卡片好了之後放入 -->
        <RouterLink :to="`/proposal/${item.customizedUrl}`" class="w-full">
          <img :src="item.image" class="w-full aspect-video object-cover object-cover cursor-pointer">
        </RouterLink>
      </SwiperSlide>
    </Swiper>
    <img @click="swiper.slidePrev()" class="hidden lg:block absolute left-[calc(33%-24px)] top-[calc(50%-24px)] z-10 cursor-pointer" src="/carousel/prev.svg">
    <img @click="swiper.slideNext()" class="hidden lg:block absolute right-[calc(33%-24px)] top-[calc(50%-24px)] z-10 cursor-pointer" src="/carousel/next.svg">
  </section>
</template>

<style lang="scss" scoped>
.swiper-slide {
  @apply max-w-sm mx-auto max-w-none;
}
</style>
