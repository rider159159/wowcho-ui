<script lang="ts" setup>
// const router = useRouter()
import { fetchProposal } from '@/api'

const categories = [
  {
    path: 1,
    name: '社會'
  },
  {
    path: 2,
    name: '出版'
  },
  {
    path: 3,
    name: '影音'
  },
  {
    path: 4,
    name: '娛樂'
  },
  {
    path: 5,
    name: '生活'
  },
  {
    path: 6,
    name: '設計'
  },
  {
    path: 7,
    name: '科技'
  },
  {
    path: 8,
    name: '休閒'
  }
]

const hotProposalList:any = ref([])
const recentlyProposalList:any = ref([])
const carouselProposalList:any = ref([])

async function getProposalList (queryObj:any) {
  const res = await fetchProposal.getList(queryObj)
  return res
}

async function init() {
  const hotQuery = {
    order: 3,
    page: 1,
    pageSize: 3
  }
  const recentlyQuery = {
    order: 1,
    page: 1,
    pageSize: 3
  }
  const carouselQuery = {
    page: 1,
    pageSize: 6
  }
  const promise = [getProposalList(hotQuery), getProposalList(recentlyQuery), getProposalList(carouselQuery)]
  const res:any = await Promise.all(promise)
  if (res[0].status !== 'Success' || res[1].status !== 'Success' || res[2].status !== 'Success') return
  hotProposalList.value = res[1].data.list
  recentlyProposalList.value = res[0].data.list
  carouselProposalList.value = res[2].data.list
}

onMounted(() => {
  init()
})
</script>

<template>
  <div class="mx-auto flex flex-col items-center">
    <!-- Background -->
    <div class="absolute left-0 top-0 -z-10">
      <img class="hidden md:block w-1/2" src="/bg_01.png">
      <img class="block md:hidden w-9/10" src="/bg_01_mb.png">
    </div>

    <!-- Banner -->
    <div class="m-auto mt-18 px-3 md:w-4/5 md:max-w-324">
      <div class="md:max-w-324 pt-12 pb-8 px-3 md:px-0">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 items-center">
          <div class="flex flex-col">
            <div class="text-brand-1 text-h5 md:leading-h4 font-medium">Create value, share success!</div>
            <div class="text-gray-1 text-h2 leading-h2 md:leading-h1 font-bold mt-3 md:mt-4">支持夢想創造價值，<br>共享成功！</div>
            <p class="text-gray-2 leading-28px mt-4 md:mt-5">每一位賣家都有著獨特的想法和夢想，透過我們的平台而實現。我們的使命是幫助賣家們創造價值，並與支持者共享成功。</p>
            <p class="text-gray-2 leading-28px mb-10">透過我們的平台，賣家們可以輕鬆地進行募資活動，並透過與支持者的互動，得到寶貴的反饋和建議。</p>
            <div class="flex justify-center md:justify-start">
              <RouterLink to="/proposals" class="rounded-5xl transition duration-500 px-12 md:px-8 py-3 border bg-brand-1 text-white text-center border-2 border-brand-1 leading-h6 md:leading-h5 hover:bg-brand-2 hover:border-brand-2">我想贊助</RouterLink>
            </div>
          </div>
          <div>
            <img src="/cheers.png">
          </div>
        </div>
      </div>
    </div>
    <!-- Celebrities  Live -->
    <!-- <div class="w-full md:max-w-324 px-3 md:px-0 py-8 md:py-20 flex flex-col justify-center items-center gap-6 md:gap-10">
      <div class="flex flex-col justify-center items-center gap-2 md:gap-4">
        <div class="text-center text-h4 md:text-h2 leading-h4 md:leading-h2 text-brand-1 font-medium md:font-bold">募資直播  Celebrities  Live</div>
        <div class="text-h5 md:text-h4 leading-30px md:leading-9 text-gray-2">與名人網紅直播互動</div>
      </div>
      <div class="w-full flex flex-col md:flex-row justify-between gap-7 md:gap-6">
        <div v-for="i in 3" class="md:w-416px h-334px md:h-410px flex justify-center items-center border-2 border-gray-2 bg-gray-4" :key="i">
          我是為了直播專案預留的區塊 {{ i }}
        </div>
      </div>
    </div> -->

    <!-- Carousel -->
    <div class="flex justify-center items-center w-[calc(100vw-24px)] h-full py-8 pb-20">
      <!-- 我是為了輪播牆預留的區塊 -->
      <Carousel
        :list="carouselProposalList"
        :slidesPerView="1"
        :breakpoints="{
          960: {
            slidesPerView: 3,
          },
        }"
      />
    </div>

    <!-- Category -->
    <div class="w-full py-8 md:py-20 flex flex-col gap-8 items-center relative bg-brand-4 overflow-hidden">
      <!-- Background -->
      <div class="hidden md:block absolute -right-10 top-0 bottom-0 z-0 transform -translate-y-1/2">
        <img class="w-150 h-130" src="/bg_02.png">
      </div>
      <div class="text-h3 leading-h2 md:leading-h1 text-gray-1 font-bold">募資專案類別</div>
      <ul class="hidden md:flex">
        <li v-for="category in categories" :key="category.path" class="border-line md:text-h5 leading-h6 md:leading-h4 text-gray-2 font-medium px-6">
          <RouterLink :to="`/proposals?category=${category.path}`" class="block relative z-1">{{ category.name }}</RouterLink>
        </li>
      </ul>
      <div class="flex flex-col md:hidden gap-7">
        <ul class="flex">
          <li v-for="category in categories.slice(0,4)" :key="category.path" class="border-line md:text-h4 leading-h6 md:leading-h4 text-gray-2 font-medium px-6">{{ category.name }}</li>
        </ul><ul class="flex">
          <li v-for="category in categories.slice(4)" :key="category.path" class="border-line md:text-h4 leading-h6 md:leading-h4 text-gray-2 font-medium px-6">{{ category.name }}</li>
        </ul>
      </div>
    </div>

    <div class="m-auto px-3 md:w-4/5 md:max-w-324">
      <!-- Hot -->
      <div class="w-full md:max-w-324 px-3 md:px-0 pt-8 md:pt-20 flex flex-col justify-center items-center gap-6 md:gap-10 border-b-1 border-line">
        <div class="w-full flex justify-between items-center">
          <div class="w-full lg:w-auto flex flex-col lg:flex-row items-center gap-2 lg:gap-6">
            <div class="text-center text-h4 md:text-h3 leading-h4 md:leading-h2 text-brand-1 font-medium md:font-bold">熱門精選  MOST MOMENTUM</div>
            <div class="text-h5 leading-30px md:leading-9 text-gray-2">最近幾天籌集到最多資金的產品</div>
          </div>
          <RouterLink to="/proposals?order=3" class="hidden text-h5 text-gray-2 lg:flex gap-10px cursor-pointer items-center">
            <p>查看更多</p>
            <img class="w-4 h-4" src="/arrow.svg" >
          </RouterLink>
        </div>
        <div class="w-full flex flex-col lg:flex-row justify-between gap-7 md:gap-6">
          <RouterLink :to="`/proposal/${recentlyProposal.customizedUrl}`" v-for="recentlyProposal in recentlyProposalList" :key="recentlyProposal.id" class="w-full">
            <ProductCard
              :image="recentlyProposal.image"
              :subtitle="recentlyProposal.summary"
              :title="recentlyProposal.name"
              :current-price="recentlyProposal.nowPrice"
              :target-price="recentlyProposal.targetPrice"
              :end-time="recentlyProposal.endTime"
            />
          </RouterLink>

        </div>
        <RouterLink to="/proposals?order=3" class="md:hidden leading-h6 text-gray-2 flex gap-10px cursor-pointer items-center mt-2 mb-8">
          <div>查看更多</div>
          <img class="w-3 h-3" src="/arrow.svg" >
        </RouterLink>
      </div>

      <!-- Recently -->
      <div class="w-full md:max-w-324 px-3 md:px-0 py-7 md:pt-14 flex flex-col justify-center items-center gap-6 md:gap-10">
        <div class="w-full flex justify-center lg:justify-between items-center">
          <div class="flex flex-col lg:flex-row justify-center items-center gap-2 lg:gap-6">
            <div class="text-center text-h4 md:text-h3 leading-h4 md:leading-h2 text-brand-1 font-medium md:font-bold">最近推出 RECENTLY LAUNCHED</div>
            <div class="text-h5 leading-30px md:leading-9 text-gray-2">最近推出的產品</div>
          </div>
          <RouterLink to="/proposals?order=1" class="hidden text-h5 text-gray-2 lg:flex gap-10px cursor-pointer items-center">
            <p>查看更多</p>
            <img class="w-4 h-4" src="/arrow.svg" >
          </RouterLink>
        </div>
        <div class="w-full flex flex-col lg:flex-row justify-between gap-7 md:gap-6">
          <RouterLink :to="`/proposal/${hotProposal.customizedUrl}`" v-for="hotProposal in hotProposalList" :key="hotProposal.id" class="w-full">
            <ProductCard
              :image="hotProposal.image"
              :subtitle="hotProposal.summary"
              :title="hotProposal.name"
              :current-price="hotProposal.nowPrice"
              :target-price="hotProposal.targetPrice"
              :end-time="hotProposal.endTime"
            />
          </RouterLink>
        </div>
        <RouterLink to="/proposals?order=1" class="md:hidden leading-h6 text-gray-2 flex gap-10px cursor-pointer items-center my-2">
          <div>查看更多</div>
          <img class="w-3 h-3" src="/arrow.svg" >
        </RouterLink>
      </div>

      <!-- Promises -->
      <div class="pb-10 md:pb-0 flex flex-col items-center gap-6 md:gap-10">
        <div class="flex flex-col items-center gap-2 md:gap-4">
          <div class="text-gray-1 text-h4 md:text-h3 leading-h4 md:leading-h2 font-medium md:font-bold">給予贊助者的信任承諾</div>
          <div class="text-center text-gray-2 text-h5 leading-30px md:leading-9">所有專案皆經由平台把關，<br>致力給贊助會員們最安心的保障！</div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-24">
          <div class="flex flex-col gap-4 items-center">
            <div class="bg-gray-4 w-24 md:w-32 h-24 md:h-32 rounded-16 flex justify-center items-center">
              <img class="w-14 md:w-20 h-14 md:h-20" src="/promises_01.svg">
            </div>
            <div class="text-brand-1 text-h5 text-center leading-h5 md:leading-h4 font-medium">平台徽章認證</div>
          </div>
          <div class="flex flex-col gap-4 items-center">
            <div class="bg-gray-4 w-24 md:w-32 h-24 md:h-32 rounded-16 flex justify-center items-center">
              <img class="w-14 md:w-20 h-14 md:h-20" src="/promises_02.svg">
            </div>
            <div class="text-brand-1 text-h5 text-center leading-h5 md:leading-h4 font-medium">渦潮保障基金</div>
          </div>
          <div class="flex flex-col gap-4 items-center">
            <div class="bg-gray-4 w-24 md:w-32 h-24 md:h-32 rounded-16 flex justify-center items-center">
              <img class="w-14 md:w-20 h-14 md:h-20" src="/promises_03.svg">
            </div>
            <div class="text-brand-1 text-h5 text-center leading-h5 md:leading-h4 font-medium">公信力檢驗</div>
          </div>
          <div class="flex flex-col gap-4 items-center">
            <div class="bg-gray-4 w-24 md:w-32 h-24 md:h-32 rounded-16 flex justify-center items-center">
              <img class="w-14 md:w-20 h-14 md:h-20" src="/promises_04.svg">
            </div>
            <div class="text-brand-1 text-h5 text-center leading-h5 md:leading-h4 font-medium">專案進度標示</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
li {
   &:not(:first-child) {
    border-left: 1px solid #C2D7EA;
   }
}
</style>
