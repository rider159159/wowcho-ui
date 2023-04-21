<script setup lang="ts">
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
  class: {
    type: String,
    default: ''
  }
})
// const { modelValue } = toRefs(props)
const emits = defineEmits(['update:modelValue'])

async function uploadImage(file:any) {
  // const { error, data } = await FETCH_UPLOADFILE.Create(file).catch((err) => console.error(err));

  // if (error) return;

  // formValue.picture = `${data[0].filePath}`;

  // uploadInputRef.value.value = '';
  emits('update:modelValue', 'test')
}
function checkImage(e:any) {
  const files = e.target.files
  const file = files[0]
  const formData = new FormData()
  formData.append('files', file)
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
      uploadImage(file)
    } else {
      uploadImage(file)
    }
  }
}

</script>

<template>
  <div>
    <label for="uploadInput" class="flex justify-center py-8px rounded-20px w-120px cursor-pointer border border-#3989D0 hover:bg-#3989D0/20 duration-300 select-none" :class="props.class">
      上傳圖片
    </label>
    <input @change="checkImage" accept=".jpg, .png, .jpeg" type="file" id="uploadInput" class="hidden">
    <span v-if="showErrorMessage">{{ props.errorMessage }}</span>
  </div>
</template>
