<script setup lang="ts">
// com
import { calculateDiscount } from '@/composables/project'
// store 運用
import { storeToRefs } from 'pinia'
import { userInfoStore } from '@/stores'
const store = userInfoStore()
const { USER_INFO_REF } = storeToRefs(store)

// 使用 router
const router = useRouter()

// 使用 API
const api = inject('$api') as any

// : Promise<void> 也可以移除
async function getMemberInfo() : Promise<void> {
  const { data, code } = await api.member.getMemberInfo()
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
  const { data, code } = await api.project.getProjectAll()
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
</script>

<template>
  <section class="p-4">
    <div class="flex gap-4">
      <button @click.prevent="getMemberInfo"
        class="relative flex-none text-sm text-center font-semibold text-white py-2.5 px-4 rounded-lg bg-slate-900 dark:bg-sky-500 dark:text-white focus:outline-none hover:bg-slate-700 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:highlight-white/20 dark:hover:bg-sky-400 dark:focus:ring-2 dark:focus:ring-sky-600 dark:focus:ring-offset-slate-900">
        獲得使用者資料至 store
      </button>
      <button @click.prevent="openModal"
        class="relative flex-none text-sm text-center font-semibold text-white py-2.5 px-4 rounded-lg bg-slate-900 dark:bg-sky-500 dark:text-white focus:outline-none hover:bg-slate-700 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:highlight-white/20 dark:hover:bg-sky-400 dark:focus:ring-2 dark:focus:ring-sky-600 dark:focus:ring-offset-slate-900">
        開啟彈窗
      </button>
      <button @click.prevent="getProductAll"
        class="relative flex-none text-sm text-center font-semibold text-white py-2.5 px-4 rounded-lg bg-slate-900 dark:bg-sky-500 dark:text-white focus:outline-none hover:bg-slate-700 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:highlight-white/20 dark:hover:bg-sky-400 dark:focus:ring-2 dark:focus:ring-sky-600 dark:focus:ring-offset-slate-900">
        獲得商品列表
      </button>
    </div>
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
    </Modal>
  </section>
</template>
