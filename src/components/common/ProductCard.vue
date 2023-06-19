<script setup lang="ts">
import { calcTargetPrice, formatRemainingTime } from '@/composables'
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

const liveTime = new Date(props.liveTime)
</script>

<template>
  <div class="flex flex-col justify-between w-full cursor-pointer ease-in duration-300 hover:-translate-y-4 mb-7 md:mb-14">
    <div>
      <div class="relative">
        <img class="w-full aspect-video object-cover mb-4 md:mb-6" :src="props.image" :alt="props.title">
        <div
          v-if="props.isLive"
          class="absolute left-4 bottom-4 flex items-center gap-x-3 font-medium text-white"
        >
          <span
            v-if="props.vipLive"
            class="block bg-brand-2 rounded-lg py-2 px-3"
          >
            VIP會員限定
          </span>
          <span v-if="props.liveTime" class="block">
            直播時間：{{ liveTime.getFullYear() }}/{{ liveTime.getMonth() + 1 }}/{{ liveTime.getDate() }} {{ liveTime.getHours() }}:{{ liveTime.getMinutes() }}
          </span>
        </div>
      </div>
      <h3 class="text-lg font-medium line-clamp-2 mb-2 md:mb-3">{{ props.title }}</h3>
      <p class="text-gray-2 line-clamp-3 mb-5 md:mb-6">{{ props.subtitle }}</p>
    </div>
    <div>
      <div class="flex justify-between items-center text-brand-1 mb-2 md:mb-3">
        <div class="w-full h-3 bg-gray-4 rounded-md overflow-hidden mr-2">
          <div class="bg-gradient-to-r from-brand-2 to-brand-3 h-full" :style="`width: ${calcTargetPrice(props.currentPrice, props.targetPrice)}%`"></div>
        </div>
        {{  calcTargetPrice(props.currentPrice, props.targetPrice) }}%
      </div>
      <div class="flex justify-between">
        <span>NT$ {{ formattedCurrentPrice }}</span>
        <span>倒數 {{ formatRemainingTime(props.endTime) }}  天</span>
      </div>
    </div>
  </div>
</template>
