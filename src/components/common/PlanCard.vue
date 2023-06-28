<script setup lang="ts">
import { formatDateAccomplish } from '@/composables'
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
  },
  type: {
    type: String,
    default: 'default'
  },
  pickupDate: {
    type: Number,
    default: 0
  },
  proposalStatus: {
    type: Number,
    default: 0
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
    </div>
    <h2 class="text-xl font-bold mb-3 md:mb-4">
      {{ props.title }}
    </h2>
    <div class="flex items-center justify-between mb-1 md:mb-2">
      <p class="text-xl font-bold text-brand-1">
        NT$ {{ price }}
      </p>
    </div>

    <p v-if="props.originPrice !== null" class="text-sm text-gray-2 mb-1 md:mb-2">
      原價 NT{{ originPrice }}，現省 NT{{ discountDifference }}
    </p>

    <p v-if="props.count !== null" class="text-sm bg-#EDECF2 inline-block text-#555 p-2 rounded-8px" >剩餘 {{ count }} 份</p>

    <ul class="text-gray-1">

      <li class=" border-gray-4 pt-3 md:pt-4 mb-3 md:mb-4">
        <h3 class="text-sm md:text-base mb-2">方案內容</h3>
        <div v-html="props.content"></div>
      </li>
    </ul>
    <p v-if="props.pickupDate!==0" class="text-sm text-gray-2 text-center mb-4"> {{ formatDateAccomplish(props.pickupDate) }} </p>

    <router-link v-if="props.type === 'default' && props.proposalStatus !==5 " :to="`/cart?id=${props.id}`">
      <MyButton class="bg-brand-1 w-full !py-2 text-white outline outline-2 outline-brand-1 hover:bg-white hover:text-brand-1">贊助專案</MyButton>
    </router-link>
    <MyButton v-else-if="props.proposalStatus == 5" class="bg-#FF5D71 w-full !py-2 text-white outline outline-2 outline-#FF5D71 hover:bg-white hover:text-#FF5D71">專案以下架</MyButton>

  </div>
</template>

<style lang="scss" scoped>
.verticalLr{
  -webkit-writing-mode: vertical-lr;
  writing-mode: vertical-lr;
}
.writingVerticalLr{
  writing-mode: lr;
  letter-spacing: 1px;
}
.subtract {
  background-image: url('/subtract.png');
  // TODO: 目前是呈現文字直式、字數正常，但是如果要呈現像設計稿 66 折還是會有問題，寫法待討論
  -webkit-writing-mode: vertical-lr;
  writing-mode: vertical-lr;
  text-orientation: upright;
  letter-spacing: 15px;
  width: 48px;
  height: 67px;
}
</style>
