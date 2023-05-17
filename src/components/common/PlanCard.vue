<script setup lang="ts">
import { calculateDiscount } from '@/composables'
const props = defineProps({
  id: {
    type: String
  },
  title: {
    type: String
  },
  image: {
    type: String
  },
  discountText: {
    type: String
  },
  count: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    default: 0
  },
  originPrice: {
    type: Number,
    default: 0
  },
  // spotGoods: {
  //   type: String
  // },
  content: {
    type: String
  },
  shipping: {
    type: String
  }
})

const price = computed(() => {
  return props.price.toLocaleString()
})

const originPrice = computed(() => {
  return props.originPrice.toLocaleString()
})

const discountDifference = computed(() => {
  return (props.originPrice - props.price).toLocaleString()
})
</script>

<template>
  <div>
    <div class="relative">
      <img class="w-full rounded-2xl mb-4 md:mb-6" :src="props.image" :alt="props.title">
      <div v-if="props.originPrice !== null" class="subtract | absolute top-0 right-4 flex justify-center items-center font-medium text-white">
        <span class="writingVerticalLr">{{ calculateDiscount(props.originPrice, props.price) }}</span>
        折
      </div>
      <div v-if="props.count !== null" class="absolute left-4 bottom-4 bg-brand-2 font-medium text-white rounded-lg px-3 py-2">剩餘 {{ count }} 份</div>
    </div>
    <h2 class="text-xl md:text-2xl font-medium mb-3 md:mb-4">
      {{ props.title }}
    </h2>
    <p class="text-2xl md:text-3xl font-medium text-brand-1 mb-1 md:mb-2">
      NT$ {{ price }}
    </p>
    <p v-if="props.originPrice !== null" class="text-sm md:text-base text-gray-2 mb-3 md:mb-4">
      原價 NT{{ originPrice }}，現省 NT{{ discountDifference }}
    </p>
    <ul class="text-gray-1">
      <!-- <li class="border-t-1 border-gray-4 pt-3 md:pt-4 mb-3 md:mb-4">
        <h3 class="text-sm md:text-base mb-2">目前現貨</h3>
        <p class="font-medium md:text-xl">{{ props.spotGoods }}</p>
      </li> -->
      <li class="border-t-1 border-gray-4 pt-3 md:pt-4 mb-3 md:mb-4">
        <h3 class="text-sm md:text-base mb-2">方案內容</h3>
        <div v-html="props.content"></div>
      </li>
    </ul>
    <!-- <p class="text-brand-2 mb-3 md:mb-4">由於螢幕、拍攝會有色差等原因,以實際商品顏色為主</p> -->
    <!-- <div class="bg-gray-4 rounded-2xl px-4 py-3 mb-4 md:mb-6" v-html="props.shipping" /> -->
    <!-- props.id -->
    <router-link :to="`/cart?id=${props.id}`">
      <MyButton class="bg-brand-1 w-full text-white outline outline-2 outline-brand-1 hover:bg-white hover:text-brand-1">贊助專案</MyButton>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.verticalLr{
  -webkit-writing-mode: vertical-lr;
  writing-mode: vertical-lr;
}
.writingVerticalLr{
  writing-mode:lr
}
.subtract {
  background-image: url('/subtract.png');
  // TODO: 目前是呈現文字直式、字數正常，但是如果要呈現像設計稿 66 折還是會有問題，寫法待討論
  -webkit-writing-mode: vertical-lr;
  writing-mode: vertical-lr;
  text-orientation: upright;
  letter-spacing: 5px;
  width: 48px;
  height: 67px;
}
</style>
