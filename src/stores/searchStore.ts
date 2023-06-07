import { defineStore } from 'pinia'

export const searchStore = defineStore('search-store', () => {
  const SEARCH_REF = ref('')
  const SEARCH_CONTROL = ref(false)
  const HAVE_SEARCH = computed(() => SEARCH_REF.value.length > 1)
  return {
    SEARCH_REF,
    SEARCH_CONTROL,
    HAVE_SEARCH
  }
})
