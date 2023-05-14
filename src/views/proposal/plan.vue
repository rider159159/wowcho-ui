<script setup lang="ts">

</script>

<template>
  <!-- <h1>查看贊助方案</h1> -->
  <div class="container pt-10 mx-auto">
    <ProductCard class="mb-10" />
    <PlanList
      class="mb-10"
      :data="[{}, {}, {}, {}]"
    />
  </div>
</template>
