<script setup lang="ts">
const props = defineProps({
  image: {
    type: String
  },
  title: {
    type: String
  },
  subtitle: {
    type: String
  },
  currentPrice: {
    type: Number,
    default: 0
  },
  targetPrice: {
    type: Number,
    default: 0
  },
  endTime: {
    type: Number,
    default: 0
  },
  isLive: {
    type: Boolean,
    default: false
  },
  vipLive: {
    type: Boolean,
    default: false
  },
  liveTime: {
    type: Number,
    default: 0
  }
})

// 計算募資達成率

// 計算募資剩餘天數
// const timeDifference = Math.abs(props.endTime - Date.now()) // 到期時間戳與目前時間戳的絕對值

// const expiryDate = Math.floor(timeDifference / (24 * 60 * 60 * 1000))

// 加上千分位符號
const formattedCurrentPrice = computed(() => {
  return props.currentPrice.toLocaleString()
})

const formattedTargetPrice = computed(() => {
  return props.targetPrice.toLocaleString()
})
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-10 gap-6 w-full cursor-pointer ease-in duration-300 hover:-translate-y-4">
    <div class="col-span-1 lg:col-span-3">
      <img class="w-full mb-4 md:mb-8" :src="props.image" :alt="props.title">
    </div>
    <div class="mb-6 lg:mb-0 col-span-1 lg:col-span-7">
      <h3 class="text-xl font-medium mb-2 lg:mb-6">{{ props.title }}</h3>
      <div class="flex items-center">
        <span class="font-bold">NT$ {{ formattedCurrentPrice }}</span>
        <span class="mx-1">/</span>
        <span class="text-sm">目標 NT$ {{ formattedTargetPrice }}</span>
      </div>
    </div>
  </div>
</template>
