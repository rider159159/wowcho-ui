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
  percent: {
    type: Number,
    default: 0,
  },
  currentPrice: {
    type: Number,
    default: 0,
  },
  remainingDays: {
    type: Number,
    default: 0,
  }
});

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
        <div class="bg-brand-3 h-full" :style="`width: ${props.percent}%`"></div>
      </div>
      {{ props.percent }}%
    </div>
    <div class="flex justify-between">
      <span>NT$ {{ formattedCurrentPrice }}</span>
      <span>倒數 {{ props.remainingDays }} 天</span>
    </div>
  </div>
</template>