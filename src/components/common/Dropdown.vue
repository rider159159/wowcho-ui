<script setup lang="ts">

const props = defineProps({
  itemList: {
    type: Array,
    default: () => []
  },
  modelValue: [String, Number]
})
const emits = defineEmits(['update:modelValue'])

function closeDropdown(value:number) {
  isOpen.value = false
  emits('update:modelValue', value)
}
const itemsRef:any = toRef(props, 'itemList')
const isOpen = ref(false)
</script>

<template>
  <section class="antialiased font-sans" >
    <div class="p-8 max-w-xs mx-auto text-right" style="min-height: 480px;">
      <div id="dropdown" class="relative inline-block">
        <button @click="isOpen = true"
          class="inline-flex items-center pl-6 pr-2 py-2 font-semibold text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:shadow-outline active:bg-gray-900">
          Account
          <svg class="ml-2 h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z" />
          </svg>
        </button>

        <div v-if="isOpen" @click="isOpen = false" class="fixed inset-0" tabindex="-1"></div>

        <transition
          enter-class="opacity-0 transform scale-90 transition-all"
          enter-active-class="transition ease-out duration-75"
          enter-to-class="opacity-100 transform scale-100"
          leave-class="opacity-100 transform scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-to-class="opacity-0 transform scale-90">
          <div v-if="isOpen" class="absolute right-0 mt-3 text-left z-75 transform origin-top-right">
            <div class="w-64 bg-white rounded-lg shadow-lg">
              <div v-for="(item, index) in itemsRef" :key="index" class="border-t-2 border-gray-200 py-1">
                <a @click.prevent="closeDropdown(item.value)" class="block px-6 py-3 leading-tight hover:bg-gray-200">{{ item.name }}</a>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>
