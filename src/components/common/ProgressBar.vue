<script setup lang="ts">
const props = defineProps({
  percent: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <div class="circle | rounded-full relative shrink-0" :style="{'--percent': props.percent}">
    <div class="circle-inside | absolute flex left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white items-center justify-center text-xl">
      {{ props.percent }}%
    </div>
  </div>
</template>

<style lang="scss" scoped>
.circle{
  --width: 80px;
  --deg: calc(360deg * calc(var(--percent) / 100));
  width: 80px;
  height: var(--width);
  background-image: conic-gradient(#369CF0 var(--deg), #EFEFEF var(--deg));
}

.circle-inside{
  --bar-width: 15px;
  width: calc(var(--width) - var(--bar-width));
  height: calc(var(--width) - var(--bar-width));
}
</style>

<!-- 參考資料：https://tools.wingzero.tw/article/sn/1399 -->
