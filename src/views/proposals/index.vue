<script setup lang="ts">

</script>

<template>
  <div class="container mx-auto">
    <div class="flex justify-between items-center mt-30 mb-10">
      <div class="border-1 border-gray-3 rounded w-50 cursor-pointer px-4 py-1">專案類別</div>
      <div class="flex items-center gap-x-4">
        <input class="border-1 border-gray-3 rounded w-50 pl-8 py-1" type="text" placeholder="Search">
        <div class="border-1 border-gray-3 rounded w-50 cursor-pointer pl-4 py-1">排序</div>
      </div>
    </div>
    <ul class="flex flex-wrap gap-x-2%">
      <li
        class="w-32%"
        v-for="i in 10"
        :key="i"
      >
        <ProductCard
            image="/frame-709.png"
            title="豬哥亮出國深造支持"
            subtitle="有夢最美，希望相隨"
            :percent="75"
            :current-price="36036"
            :target-price="100000"
            :end-time="1687018501000"
            :vip-live="i === 1"
            :live-time="1687018501000"
          />
      </li>
    </ul>
  </div>
</template>
