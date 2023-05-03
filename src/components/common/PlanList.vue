<script setup lang="ts">
const props = defineProps({
  data: {
    type: Array,
  },
});
</script>

<template>
  <div class="flex gap-x-4 w-full overflow-x-auto p-4">
    <plan-card
      v-for="(item, key) in data"
      :key="key"
      class="w-96 grow-0 shrink-0"
      id="plan_01"
      title="董事長一個人開心方案"
      image="/test.webp"
      :price="1080"
      :origin-price="2040"
      discount-text="5折"
      :count="10"
      spot-goods="岩石灰、午夜藍、藤黃色、灰棕色 ( 其他缺貨中 )"
      content="VERYKAL8 超進化雨量傘 * 1 ( 內含傘套、登山扣 )"
      shipping="出貨方式 : 現貨商品<br>本島免運 / 外島 150 元 / 港澳 300 元"
    />
  </div>
</template>