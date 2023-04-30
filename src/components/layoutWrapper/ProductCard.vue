<script setup lang="ts">
const props = defineProps({
  image: {
    type: String,
  },
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  currentPrice: {
    type: Number,
    default: 0,
  },
  targetPrice: {
    type: Number,
    default: 0,
  },
  endTime: {
    type: Number,
    default: 0,
  }
});

// 計算募資達成率
const complianceRate = ref(
  ((props.currentPrice / props.targetPrice) * 100).toFixed(2)
);

// 計算募資剩餘天數
const timeDifference = Math.abs(props.endTime - Date.now()); // 到期時間戳與目前時間戳的絕對值
const expiryDate = Math.floor(timeDifference / (24 * 60 * 60 * 1000));

// 加上千分位符號
const formattedCurrentPrice = computed(() => {
  return props.currentPrice.toLocaleString();
});
</script>

<template>
  <div class="w-full cursor-pointer ease-in duration-300 hover:-translate-y-4 mb-7 md:mb-14">
    <img class="w-full mb-4 md:mb-6" :src="props.image" :alt="props.title">
    <h3 class="text-xl font-medium md:text-2xl mb-2 md:mb-3">{{ props.title }}</h3>
    <p class="text-gray-2 mb-5 md:mb-6">{{ props.subtitle }}</p>
    <div class="flex justify-between mb-2 md:mb-3">
      <div class="w-full bg-gray-4 rounded-md overflow-hidden mr-2">
        <div class="bg-brand-3 h-full" :style="`width: ${complianceRate}%`"></div>
      </div>
      {{ complianceRate }}%
    </div>
    <div class="flex justify-between">
      <span>NT$ {{ formattedCurrentPrice }}</span>
      <span>倒數 {{ expiryDate }} 天</span>
    </div>
  </div>
</template>