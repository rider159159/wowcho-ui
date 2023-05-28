<script setup lang="ts">
const props = defineProps({
  title: {
    type: String
  },
  subtitle: {
    type: String
  },
  isLive: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="container mx-auto">
    <div class="md:flex md:justify-between md:items-center mb-6 md:mb-10">
      <div class="md:flex md:items-center md:gap-x-6 text-center md:text-left" :class="{'md:flex-col mx-auto': props.isLive}">
        <h2 class="text-brand-1 text-2xl md:text-3xl md-2" :class="{'md:mb-4': props.isLive}">{{ props.title }}</h2>
        <p class="text-gray-2 text-xl md:text-2xl">{{ props.subtitle }}</p>
      </div>
      <div :class="{'hidden': props.isLive}">
        <a class="hidden md:flex md:items-center md:gap-x-2" href="#">
          查看更多
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.958496 15.5833C0.750163 15.3749 0.645996 15.1283 0.645996 14.8433C0.645996 14.5583 0.750163 14.3119 0.958496 14.1041L7.06266 7.99992L0.937663 1.87492C0.743218 1.68047 0.645996 1.43742 0.645996 1.14575C0.645996 0.854085 0.750163 0.604085 0.958496 0.395752C1.16683 0.187419 1.4135 0.083252 1.6985 0.083252C1.9835 0.083252 2.22989 0.187419 2.43766 0.395752L9.43766 7.41659C9.521 7.49992 9.58016 7.5902 9.61516 7.68742C9.65016 7.78464 9.66739 7.88881 9.66683 7.99992C9.66683 8.11103 9.64933 8.2152 9.61433 8.31242C9.57933 8.40964 9.52044 8.49992 9.43766 8.58325L2.41683 15.6041C2.22238 15.7985 1.98266 15.8958 1.69766 15.8958C1.41266 15.8958 1.16627 15.7916 0.958496 15.5833Z" fill="#636466"/>
          </svg>
        </a>
      </div>
    </div>
    <ul class="md:flex gap-x-6">
      <li v-for="i in 3" :key="i">
        <a href="#">
          <ProductCard
            image="/frame-709.png"
            title="豬哥亮出國深造支持"
            subtitle="有夢最美，希望相隨"
            :percent="75"
            :current-price="36036"
            :target-price="100000"
            :end-time="1687018501000"
            :is-live="props.isLive"
            :vip-live="i === 1"
            :live-time="1687018501000"
          />
        </a>
      </li>
    </ul>
  </div>
</template>
