<script setup lang="ts">
const props = defineProps({
  active: {
    type: String,
    default: () => 'sponsor'
  }
})
</script>

<template>
  <ul class="outline outline-1 outline-brand-1 w-28 text-center text-brand-1 rounded-3 overflow-hidden">
    <li>
      <a :class="{'bg-brand-1 text-white': props.active === 'sponsor'}" class="block py-2 hover:bg-brand-1 hover:text-white" href="@">贊助紀錄</a>
    </li>
    <li>
      <a :class="{'bg-brand-1 text-white': props.active === 'proposal'}" class="block py-2 hover:bg-brand-1 hover:text-white" href="@">提案紀錄</a>
    </li>
    <li>
      <a :class="{'bg-brand-1 text-white': props.active === 'settings'}" class="block py-2 hover:bg-brand-1 hover:text-white" href="@">個人設定</a>
    </li>
  </ul>
</template>
