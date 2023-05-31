<script setup lang="ts">
import { fetchUpload } from '@/api'
const showErrorMessage = ref(false)
const props = defineProps({
  modelValue: {
    type: String,
    default: () => ''
  },
  limit: {
    type: Number,
    default: 5242880
  },
  errorMessage: {
    type: String,
    default: '檔案不可大於 5 Mb'
  },
  labelTitle: {
    type: String,
    default: '上傳圖片'
  },
  class: {
    type: String,
    default: ''
  }
})
// const { modelValue } = toRefs(props)
const emits = defineEmits(['update:modelValue'])

async function uploadImage(files:any) : Promise<void> {
  const res = await fetchUpload.upload(files)
  if (res.status !== 'Success') return

  // uploadInputRef.value.value = '';
  emits('update:modelValue', res.data.imgUrl)
}
function checkImage(e:any) {
  const files = e.target.files
  const file = files[0]
  const formData = new FormData()
  formData.append('file', file)
  // 有上傳圖片
  if (files.length > 0) {
    // props 限制大於 0 有限制，若等於 0 無限制
    if (props.limit > 0) {
      // 上傳限制 > 外層傳來限制，不打上傳 API
      if (file.size > props.limit) {
        showErrorMessage.value = true
        return
      }
      showErrorMessage.value = false
      uploadImage(formData)
    } else {
      uploadImage(formData)
    }
  }
}

</script>

<template>
  <div>
    <label for="uploadInput" class="flex justify-center py-8px px-6 rounded-20px cursor-pointer border border-brand1 bg-brand-1 text-white hover:bg-white hover:text-brand1 duration-300 select-none" :class="props.class">
      {{ props.labelTitle }}
    </label>
    <input @change="checkImage" accept=".jpg, .png, .jpeg" type="file" id="uploadInput" class="hidden">
    <span v-if="showErrorMessage">{{ props.errorMessage }}</span>
  </div>
</template>
