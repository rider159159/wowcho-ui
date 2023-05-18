<script setup lang="ts">
// 專案類別
const selectCategory = ref('')

const isShowCategories = ref(false)

function closeCategories() {
  setTimeout(() => {
    isShowCategories.value = false
  }, 100)
}

// 搜尋

const keyword = ref('')

// 排序
const selectSort = ref('')

const isShowSortList = ref(false)

function closeSortList() {
  setTimeout(() => {
    isShowSortList.value = false
  }, 100)
}

// 分頁
const currentPage = ref(1)

const totalProject = ref(50)
</script>

<template>
  <div class="container mx-auto">
    <div class="flex justify-between items-center mt-30 mb-10">
      <div class="relative">
        <div tabindex="0" @click="isShowCategories = !isShowCategories" @blur="closeCategories" class="flex justify-between items-center bg-white border-1 border-gray-3 rounded w-50 cursor-pointer px-4 py-1">
          {{ selectCategory ? selectCategory : '專案類別' }}
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
            :class="{'text-brand-2': selectCategory === ''}"
            @click="selectCategory = ''"
          >
            全部
          </li>
          <li
            class="rounded w-50 cursor-pointer px-4 py-2 hover:text-brand-2 active:text-brand-2"
            :class="{'text-brand-2': selectCategory === '社會'}"
            @click="selectCategory = '社會'"
          >
            社會
          </li>
          <li
            class="rounded w-50 cursor-pointer px-4 py-2 hover:text-brand-2 active:text-brand-2"
            :class="{'text-brand-2': selectCategory === '影音'}"
            @click="selectCategory = '影音'"
          >
            影音
          </li>
          <li
            class="rounded w-50 cursor-pointer px-4 py-2 hover:text-brand-2 active:text-brand-2"
            :class="{'text-brand-2': selectCategory === '出版'}"
            @click="selectCategory = '出版'"
          >
            出版
          </li>
          <li
            class="rounded w-50 cursor-pointer px-4 py-2 hover:text-brand-2 active:text-brand-2"
            :class="{'text-brand-2': selectCategory === '娛樂'}"
            @click="selectCategory = '娛樂'"
          >
            娛樂
          </li>
          <li
            class="rounded w-50 cursor-pointer px-4 py-2 hover:text-brand-2 active:text-brand-2"
            :class="{'text-brand-2': selectCategory === '生活'}"
            @click="selectCategory = '生活'"
          >
            生活
          </li>
          <li
            class="rounded w-50 cursor-pointer px-4 py-2 hover:text-brand-2 active:text-brand-2"
            :class="{'text-brand-2': selectSort === '設計'}"
            @click="selectCategory = '設計'"
          >
            設計
          </li>
          <li
            class="rounded w-50 cursor-pointer px-4 py-2 hover:text-brand-2 active:text-brand-2"
            :class="{'text-brand-2': selectSort === '科技'}"
            @click="selectCategory = '科技'"
          >
            科技
          </li>
        </ul>
      </div>
      <div class="flex items-center gap-x-4">
        <div class="relative">
          <input v-model="keyword" class="bg-white border-1 border-gray-3 rounded w-50 pl-8 py-1" type="text" placeholder="Search">
          <svg class="absolute top-2/4 -translate-y-2/4 left-2" width='20' height='20' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><rect width='24' height='24' stroke='none' fill='#000000' opacity='0'/>
            <g transform="matrix(1 0 0 1 12 12)" >
            <path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" translate(-12, -12)" d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z" stroke-linecap="round" />
            </g>
          </svg>
        </div>
        <div class="relative">
          <div tabindex="0" @click="isShowSortList = !isShowSortList" @blur="closeSortList" class="flex justify-between items-center bg-white border-1 border-gray-3 rounded w-50 cursor-pointer px-4 py-1">
            {{ selectSort ? selectSort : '排序' }}
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
              class="rounded w-50 cursor-pointer px-4 py-2 hover:text-brand-2 active:text-brand-2"
              :class="{'text-brand-2': selectSort === ''}"
              @click="selectSort = ''"
            >
              全部
            </li>
            <li
            class="rounded w-50 cursor-pointer px-4 py-2 hover:text-brand-2 active:text-brand-2"
            :class="{'text-brand-2': selectSort === '時間由新到舊'}"
            @click="selectSort = '時間由新到舊'"
          >
            時間由新到舊
          </li>
          <li
            class="rounded w-50 cursor-pointer px-4 py-2 hover:text-brand-2 active:text-brand-2"
            :class="{'text-brand-2': selectSort === '時間由舊到新'}"
            @click="selectSort = '時間由舊到新'"
          >
            時間由舊到新
          </li>
          <li
            class="rounded w-50 cursor-pointer px-4 py-2 hover:text-brand-2 active:text-brand-2"
            :class="{'text-brand-2': selectCategory === '專案金額由大到小'}"
            @click="selectSort = '專案金額由大到小'"
          >
            專案金額由大到小
          </li>
          <li
            class="rounded w-50 cursor-pointer px-4 py-2 hover:text-brand-2 active:text-brand-2"
            :class="{'text-brand-2': selectCategory === '專案金額由小到大'}"
            @click="selectCategory = '專案金額由小到大'"
          >
            專案金額由小到大
          </li>
        </ul>
        </div>
      </div>
    </div>
    <ul class="flex flex-wrap gap-x-2%">
      <li
        class="w-32%"
        v-for="i in 10"
        :key="i"
      >
        <ProductCard
            image="/frame-709.png"
            title="豬哥亮出國深造支持"
            subtitle="有夢最美，希望相隨"
            :percent="75"
            :current-price="36036"
            :target-price="100000"
            :end-time="1687018501000"
            :vip-live="i === 1"
            :live-time="1687018501000"
          />
      </li>
    </ul>
    <Pagination class="mb-10" v-model="currentPage" :page-size="10" :total="totalProject" ></Pagination>
  </div>
</template>
