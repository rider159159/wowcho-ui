<script setup lang="ts">
import { fetchProduct } from '@/api'

// 是否正在載入
const loading = ref(false)

// 分類列表
const categories = ref([
  '社會',
  '影音',
  '出版',
  '娛樂',
  '生活',
  '設計',
  '科技',
  '休閒'
])

// 排序列表
const sortList = ref([
  '時間由新到舊',
  '時間由舊到新',
  '專案金額由大到小',
  '專案金額由小到大'
])

// 搜尋

const keyword = ref('')

// 分類篩選相關
const selectCategory = ref(-1)

const isShowCategories = ref(false)

function closeCategories() {
  setTimeout(() => {
    isShowCategories.value = false
  }, 100)
}

// 選擇分類
function filterSelectCategory(key: number) {
  selectCategory.value = key
  currentPage.value = 1
  getApiData()
}

// 排序相關
const selectSort = ref(0)

const isShowSortList = ref(false)

function closeSortList() {
  setTimeout(() => {
    isShowSortList.value = false
  }, 100)
}

// 選擇排序
function sortProducts(key: number) {
  selectSort.value = key
  getApiData()
}

// 分頁
const currentPage = ref(1)

const postsPerPage = ref(10)

watch(currentPage, (newPage) => {
  getApiData()
})

// 取得資料
const data = ref({
  list: [],
  totalCount: 0
})

async function getApiData() {
  try {
    loading.value = true

    const res = await fetchProduct.getProducts({
      keyword: keyword.value ? keyword.value : null,
      order: selectSort.value,
      category: selectCategory.value !== -1 ? selectCategory.value : null,
      page: currentPage.value,
      pageSize: postsPerPage.value
    })

    data.value = {
      ...res.data
    }

    loading.value = false
  } catch (e) {
    loading.value = false
  }
}

getApiData()
</script>

<template>
  <div class="px-4 container mx-auto">
    <div class="md:flex md:justify-between items-center mt-30 mb-10">
      <!-- 專案類別篩選 -->
      <div class="relative  mb-4 md:mb-0">
        <div tabindex="0" @click="isShowCategories = !isShowCategories" @blur="closeCategories" class="flex justify-between items-center bg-white border-1 border-gray-3 rounded w-full md:w-50 cursor-pointer px-4 py-1">
          {{ selectCategory !== -1 ? categories[selectCategory] : '專案類別' }}
          <svg v-if="!isShowCategories" width='12' height='12' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><rect width='24' height='24' stroke='none' fill='#000000' opacity='0'/>
            <g transform="matrix(0.5 0 0 0.5 12 12)" >
            <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" translate(-24, -23.2)" d="M 40.394 41 L 7.606 41 C 6.303 41 5.1370000000000005 40.326 4.486 39.198 C 3.834999999999999 38.07 3.835 36.722 4.486 35.594 L 20.88 7.2 L 20.88 7.2 C 21.531 6.072 22.697 5.399 24 5.399 C 25.303 5.399 26.469 6.072 27.12 7.2 L 43.513999999999996 35.595 C 44.165 36.723 44.165 38.071 43.513999999999996 39.199 C 42.86299999999999 40.327 41.696 41 40.394 41 z" stroke-linecap="round" />
            </g>
          </svg>
          <svg v-else width='12' height='12' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><rect width='24' height='24' stroke='none' fill='#000000' opacity='0'/>
            <g transform="matrix(0.91 0 0 0.91 12 12)" >
            <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" translate(-12, -13)" d="M 22.777 4.983 C 22.443 4.377 21.791 4 21.074 4 L 2.926 4 C 2.209 4 1.557 4.377 1.223 4.983 C 0.905 5.561 0.927 6.24 1.281 6.798 L 10.355 21.113 C 10.706 21.669 11.321 22 12 22 C 12.679 22 13.294 21.669 13.646 21.114 L 22.72 6.799000000000001 C 23.073 6.24 23.095 5.561 22.777 4.983 z" stroke-linecap="round" />
            </g>
          </svg>
        </div>
        <ul v-if="isShowCategories" class="absolute z-10 bg-white border-1 border-gray-3 mt-1">
          <li
            class="rounded w-50 cursor-pointer px-4 py-2 hover:text-brand-2 active:text-brand-2"
            :class="{'text-brand-2': selectCategory === -1}"
            @click="filterSelectCategory(-1)"
          >
            全部
          </li>
          <li
            v-for="(category, key) in categories"
            :key="`${category}_${key}`"
            class="rounded w-50 cursor-pointer px-4 py-2 hover:text-brand-2 active:text-brand-2"
            :class="{'text-brand-2': selectCategory === key}"
            @click="filterSelectCategory(key)"
          >
            {{ category }}
          </li>
        </ul>
      </div>
      <div class="flex flex-col-reverse gap-y-4 md:gap-y-0 md:flex-row items-center gap-x-4">
        <!-- 搜尋框 -->
        <div class="relative w-full">
          <input @keyup.enter="getApiData" v-model="keyword" class="bg-white border-1 border-gray-3 rounded w-full md:w-50 pl-8 py-1" type="text" placeholder="Search">
          <svg class="absolute top-2/4 -translate-y-2/4 left-2" width='20' height='20' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><rect width='24' height='24' stroke='none' fill='#000000' opacity='0'/>
            <g transform="matrix(1 0 0 1 12 12)" >
            <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" translate(-12, -12)" d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z" stroke-linecap="round" />
            </g>
          </svg>
        </div>
        <!-- 排序選擇 -->
        <div class="relative w-full">
          <div tabindex="0" @click="isShowSortList = !isShowSortList" @blur="closeSortList" class="flex justify-between items-center bg-white border-1 border-gray-3 rounded md:w-50 cursor-pointer px-4 py-1">
            {{ sortList[selectSort] ? sortList[selectSort] : '排序' }}
            <svg v-if="!isShowSortList" width='12' height='12' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><rect width='24' height='24' stroke='none' fill='#000000' opacity='0'/>
              <g transform="matrix(0.5 0 0 0.5 12 12)" >
              <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" translate(-24, -23.2)" d="M 40.394 41 L 7.606 41 C 6.303 41 5.1370000000000005 40.326 4.486 39.198 C 3.834999999999999 38.07 3.835 36.722 4.486 35.594 L 20.88 7.2 L 20.88 7.2 C 21.531 6.072 22.697 5.399 24 5.399 C 25.303 5.399 26.469 6.072 27.12 7.2 L 43.513999999999996 35.595 C 44.165 36.723 44.165 38.071 43.513999999999996 39.199 C 42.86299999999999 40.327 41.696 41 40.394 41 z" stroke-linecap="round" />
              </g>
            </svg>
            <svg v-else width='12' height='12' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><rect width='24' height='24' stroke='none' fill='#000000' opacity='0'/>
              <g transform="matrix(0.91 0 0 0.91 12 12)" >
              <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" translate(-12, -13)" d="M 22.777 4.983 C 22.443 4.377 21.791 4 21.074 4 L 2.926 4 C 2.209 4 1.557 4.377 1.223 4.983 C 0.905 5.561 0.927 6.24 1.281 6.798 L 10.355 21.113 C 10.706 21.669 11.321 22 12 22 C 12.679 22 13.294 21.669 13.646 21.114 L 22.72 6.799000000000001 C 23.073 6.24 23.095 5.561 22.777 4.983 z" stroke-linecap="round" />
              </g>
            </svg>
          </div>
          <ul v-if="isShowSortList" class="absolute z-10 bg-white border-1 border-gray-3 mt-1">
            <li
              v-for="(sort, key) in sortList"
              :key="`${sort}_${key}`"
              class="rounded w-50 cursor-pointer px-4 py-2 hover:text-brand-2 active:text-brand-2"
              :class="{'text-brand-2': selectSort === key}"
              @click="sortProducts(key)"
            >
              {{ sort }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 商品列表 -->
    <ul v-if="data.list.length > 0" class="md:flex flex-wrap gap-x-2%">
      <li
        v-for="product in data.list"
        :key="product._id"
        class="w-full md:w-49% lg:w-32%"
      >
        <a :href="`/proposal/${product.customizedUrl}`">
          <!-- TODO: 商品圖片、目前金額、募資達標率待串接 -->
          <ProductCard
            image="/frame-709.png"
            :title="product.name"
            :subtitle="product.summary"
            :percent="36036 / product.targetPrice"
            :current-price="36036"
            :target-price="product.targetPrice"
            :end-time="product.endTime"
          />
        </a>
      </li>
    </ul>
    <!-- loading 顯示文字 -->
    <div v-else-if="loading" class="mb-8">
      <p class="text-center">資料載入中，請稍候</p>
    </div>
    <!-- 沒有資料顯示文字 -->
    <div v-else class="mb-8">
      <p class="text-center">目前沒有資料</p>
    </div>
    <!-- 分頁 -->
    <Pagination
      v-if="data.totalCount > 0"
      class="mb-10"
      v-model="currentPage"
      :page-size="postsPerPage"
      :total="data.totalCount"
    />
  </div>
</template>
