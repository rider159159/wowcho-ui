<script setup lang="ts">
import { SET_TOKEN } from '@/utils'
// composables
import { numberWithCommas, calculateDiscount, calcTargetPrice, dateYYYYMMDD, formatRemainingTime, formatDateAccomplish } from '@/composables'
// store 運用
import { storeToRefs } from 'pinia'
import { userInfoStore } from '@/stores'
import { fetchDemo } from '@/api'
import { Swal } from '@/plugins/sweet-alert'
import { toast } from '@/plugins'

const { FN_LOGOUT } = userInfoStore()
const { USER_INFO_REF } = storeToRefs(userInfoStore())
// 判斷環境
const env = import.meta.env.MODE

// 使用 router
const router = useRouter()

// 使用 API
// const api = inject('$api') as any

// : Promise<void> 也可以移除
async function getMemberInfo() : Promise<void> {
  const { data, code } = await fetchDemo.getMemberInfo()
  if (code !== 200) return
  // API 丟置 store
  USER_INFO_REF.value = data.userInfo
}

// 彈窗控制
const demoModal = ref(false)
function openModal() {
  demoModal.value = true
}

const projectList = ref<any>([])
async function getProductAll(): Promise<void> {
  const params = { id: '123' }
  const { data, code } = await fetchDemo.getProjectAll(params)
  if (code !== 200) return
  projectList.value = data.projectList
}

function toProject(item:any) {
  router.push({
    name: 'projects',
    params: {
      id: item.id
    }
  })
}

function saveCookie() {
  const cookie = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIyNDAyODI5NTcyNzExMDkiLCJuYW1lIjoic3lzdGVtIiwiZ2l2ZW5fbmFtZSI6IlN5c3RlbSIsInN1YiI6IjI0MDI4Mjk1NzI3MTEwOSIsImp0aSI6ImEzYTY4ODE4LTE2YWMtNGE0MC1iM2ZiLTY5OGY5OWM1YTE3OSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IjIwMjMvNC8xMyDkuIrljYggMDI6MjM6MDQiLCJyb2xlIjoiU3lzdGVtIiwibmJmIjoxNjgxMjg2NTg0LCJleHAiOjE2ODEzMjI1ODQsImlhdCI6MTY4MTI4NjU4NCwiaXNzIjoiU2luZ2xlU2lnbiJ9.by4lxi8xuxf7zleknkxdM9vVWaJaxL3FGxuEzHaokR0'
  SET_TOKEN(cookie)
}

const form = {
  name: '',
  content: '',
  comments: 0
}

async function submitForm() {
  const { data, code } = await fetchDemo.createPosts(form)
  if (code !== 200) return
  console.log(data, '新增成功')
}
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})

function openToast() {
  toast.success('測試', {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    theme: 'colored'
  })
  toast.success('登入成功', {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000
  })
  toast.error('登入失敗', {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000
  })
}
const formBody:any = ref({})

onMounted(() => {
  Toast.fire({
    icon: 'success',
    title: '加入書籤成功！'
  })
})
const upload = ref('')
const pagination = ref(2)
const total = ref(50)

</script>

<template>
  <section class="p-4">
    <Pagination v-model="pagination" :page-size="10" :total="total" ></Pagination>
    <span class="mdi mdi-close text-brand3 md:text-brand1 text-h1"></span>
    <div class="flex gap-4">
      <MyButton class="bg-brand-1 text-white outline outline-2 outline-brand-1 hover:bg-white hover:text-brand-1">lorem</MyButton>
      <button @click.prevent="getMemberInfo"
        class="relative flex-none text-sm text-center font-semibold text-white py-2.5 px-4 rounded-lg bg-slate-900 dark:bg-sky-500 dark:text-white focus:outline-none hover:bg-slate-700 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:highlight-white/20 dark:hover:bg-sky-400 dark:focus:ring-2 dark:focus:ring-sky-600 dark:focus:ring-offset-slate-900">
        獲得使用者資料至 store
      </button>
      <button @click.prevent="FN_LOGOUT()"
        class="relative flex-none text-sm te`xt-center font-semibold text-white py-2.5 px-4 rounded-lg bg-slate-900 dark:bg-sky-500 dark:text-white focus:outline-none hover:bg-slate-700 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:highlight-white/20 dark:hover:bg-sky-400 dark:focus:ring-2 dark:focus:ring-sky-600 dark:focus:ring-offset-slate-900">
        登出
      </button>
      <button @click.prevent="openModal"
        class="relative flex-none text-sm text-center font-semibold text-white py-2.5 px-4 rounded-lg bg-slate-900 dark:bg-sky-500 dark:text-white focus:outline-none hover:bg-slate-700 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:highlight-white/20 dark:hover:bg-sky-400 dark:focus:ring-2 dark:focus:ring-sky-600 dark:focus:ring-offset-slate-900">
        開啟彈窗
      </button>
      <button @click.prevent="getProductAll"
        class="relative flex-none text-sm text-center font-semibold text-white py-2.5 px-4 rounded-lg bg-slate-900 dark:bg-sky-500 dark:text-white focus:outline-none hover:bg-slate-700 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:highlight-white/20 dark:hover:bg-sky-400 dark:focus:ring-2 dark:focus:ring-sky-600 dark:focus:ring-offset-slate-900">
        獲得商品列表
      </button>
      <button @click.prevent="saveCookie"
      class="relative flex-none text-sm text-center font-semibold text-white py-2.5 px-4 rounded-lg bg-slate-900 dark:bg-sky-500 dark:text-white focus:outline-none hover:bg-slate-700 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:highlight-white/20 dark:hover:bg-sky-400 dark:focus:ring-2 dark:focus:ring-sky-600 dark:focus:ring-offset-slate-900">
        儲存 cookie
      </button>
      <button @click.prevent="openToast"
        class="relative flex-none text-sm text-center font-semibold text-white py-2.5 px-4 rounded-lg bg-slate-900 dark:bg-sky-500 dark:text-white focus:outline-none hover:bg-slate-700 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:highlight-white/20 dark:hover:bg-sky-400 dark:focus:ring-2 dark:focus:ring-sky-600 dark:focus:ring-offset-slate-900">
        開啟吐司
      </button>
    </div>
    <VueDatePicker v-model="formBody.birthday" :format="'yyyy/MM/dd HH:mm'" locale="zh-TW" auto-apply>
      <template #dp-input="{ value }">
        <input :value="value" type="text" class="w-full text-h6 leading-h4 px-2 rounded b border-[#ccc] focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600">
      </template>
    </VueDatePicker>

    <h2 class="my-6 text-8 fw-700">商品列表</h2>
    <div class="grid grid-cols-3 gap-4">
      <div @click="toProject(item)" v-for="(item,index) in projectList" :key="index" class="rounded-xl cursor-pointer">
        <div class="flex flex-col w-full">
          <img class="mb-4" src="/test.webp" alt="">
          <p class="leading-5 mb-4">{{ item.title }}</p>
          <div class="flex">
            <p class="fw-700 text-6 mr-4">NT {{ item.discountPrice }}</p>
            <p class="self-center text-xs font-bold text-black bg-yellow-300 p-1"> {{ calculateDiscount(item.originalPrice, item.discountPrice)}} 折</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h1>獲得環境:{{ env }}</h1>
      <div> timeStamp 轉換{{ dateYYYYMMDD(1680307200000) }}</div>
      <div>剩餘時間 {{ formatRemainingTime(1696125600000) }}</div>
      <div>實現時間: {{ formatDateAccomplish(1696425936000) }}</div>
      <!-- 原價、實際價格 -->
      <p class="self-center text-xs font-bold text-black bg-yellow-300 p-1"> {{ calculateDiscount(2000, 1550)}} 折</p>
      <!-- 目標金額，當前金額 -->
      <div>目標金額1 - {{ calcTargetPrice(4237342, 100000)}}%</div>
      <div>目標金額2 - {{ calcTargetPrice(1000, 10000)}}%</div>
      <div> NT${{ numberWithCommas(42500) }}</div>

    </div>
    <Upload v-model="upload"></Upload>
    <img :src="upload" alt="">
    <!-- 彈窗 -->
    <Modal v-model="demoModal" title="測試彈窗">
      <table class="w-full border-separate border border-slate-400 ...">
        <thead>
          <tr>
            <th class="border border-slate-300 ...">State</th>
            <th class="border border-slate-300 ...">City</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-slate-300 ...">Indiana</td>
            <td class="border border-slate-300 ...">Indianapolis</td>
          </tr>
          <tr>
            <td class="border border-slate-300 ...">Ohio</td>
            <td class="border border-slate-300 ...">Columbus</td>
          </tr>
          <tr>
            <td class="border border-slate-300 ...">Michigan</td>
            <td class="border border-slate-300 ...">Detroit</td>
          </tr>
        </tbody>
      </table>
      <div>
        <div class="flex">
          <label for="name">名稱</label>
          <input v-model="form.name" id="name" class="border-2 b-blue" type="text">
        </div>
        <div class="flex">
          <label for="content">內容</label>
          <input v-model="form.content" id="content" class="border-2 b-blue" type="text">
        </div>
        <div class="flex">
          <label for="comments">頻論數量</label>
          <input v-model="form.comments" id="comments" class="border-2 b-blue" type="text">
        </div>
        <button @click.prevent="submitForm">送出表單</button>
      </div>
    </Modal>
  </section>
</template>
