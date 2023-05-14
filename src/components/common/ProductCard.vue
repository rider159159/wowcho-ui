<script setup lang="ts">
const props = defineProps({
  projectImage: {
    type: String,
    default: '/test.webp'
  },
  projectName: {
    type: String,
    default: '日本BROSKI 防水真皮背包｜不怕淋雨高質感牛皮革、包身立體不變型【嘖嘖人氣好評贊助第二彈】'
  },
  proposer: {
    type: String,
    default: '雨傘富翁'
  },
  proposerLink: {
    type: String,
    default: '#'
  },
  currentPrice: {
    type: Number,
    default: 4566000
  },
  targetPrice: {
    type: Number,
    default: 6088000
  }
})

const currentPrice = computed(() => {
  return props.currentPrice.toLocaleString()
})

const targetPrice = computed(() => {
  return props.targetPrice.toLocaleString()
})
</script>

<template>
  <div class="md:flex gap-x-10 w-full">
    <img
      class="w-full md:w-96 md:h-60 mx-auto"
      :src="projectImage"
      :alt="props.projectName"
    >
    <div class="flex flex-col justify-between py-2">
      <div class="mb-4">
        <h1 class="text-xl font-bold mb-1">
          {{ projectName }}
        </h1>
        <p class="text-gray-2">
          提案人
          <a class="text-brand-1" :href="proposerLink">{{ proposer }}</a>
        </p>
      </div>
      <div class="flex items-center gap-x-5">
        <ProgressBar :percent="(props.currentPrice / props.targetPrice) * 100" />
        <div class="text-gray-2">
          <p class="text-sm mb-2">目標 NT {{ targetPrice }}</p>
          <p class="font-bold text-3xl">NT {{ currentPrice }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
