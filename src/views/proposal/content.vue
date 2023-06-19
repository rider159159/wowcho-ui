<!-- eslint-disable no-unused-vars -->
<script lang="ts" setup>
// composables
import { numberWithCommas, timeStampChangeString, formatRemainingTime, dateYYYYMMDD } from '@/composables'
import { fetchProposal } from '@/api'
enum PROPOSAL {
  CONTENT, PROCESS, PROMISES, FAQ
}

const content = ref(PROPOSAL.CONTENT)
const route = useRoute()

const categoryList = ref([
  {
    title: '社會',
    value: 1
  },
  {
    title: '出版',
    value: 2
  },
  {
    title: '影音',
    value: 3
  },
  {
    title: '娛樂',
    value: 4
  },
  {
    title: '生活',
    value: 5
  },
  {
    title: '設計',
    value: 6
  },
  {
    title: '科技',
    value: 7
  },
  {
    title: '休閒',
    value: 8
  }
])

function categoryName (num:8) {
  const category = categoryList.value.find((item) => item.value === num)
  return category?.title
}

const proposal:any = ref({
  targetPrice: 0,
  nowPrice: 0,
  ownerId: {
    username: ''
  },
  placardIdList: [],
  faqIdList: []
})
function contentHandler(target: PROPOSAL) {
  content.value = target
}

async function getProposal() {
  const query = { proposalUrl: route.params.proposal }
  const res = await fetchProposal.get(query)
  if (res.status !== 'Success') return
  proposal.value = res.data
}
onMounted(() => {
  getProposal()
})
</script>

<template>
  <div class="flex flex-col gap-5 mt-4 lg:mt-18">
    <div class="flex gap-4 text-xl">
      <p>提案人</p>
      <RouterLink :to="`/users/${proposal.ownerId._id}`" class="text-brand-1 font-medium">{{ proposal.ownerId.businessName }}</RouterLink>
    </div>
    <h1 class="text-h3 leading-h3 md:(text-h2 leading-h2)">{{ proposal.name }}</h1>
    <div class="grid grid-cols-1 lg:grid-cols-12 mt-3 md:mt-5 gap-4 lg:gap-10">
      <img class="lg:col-span-8 object-cover aspect-9/5 rounded-2xl" :src="proposal.image" />
      <div class="lg:col-span-4 flex flex-col justify-between gap-6">
        <div class="flex flex-col gap-4 md:gap-6">
          <div class="flex">
            <tag class="leading-h6 px-3 py-2">{{ categoryName(proposal.category) }}</tag>
          </div>
          <div>{{ proposal.summary }}</div>
          <ShareButton />
          <div class="flex items-center gap-4">
            <!-- <div class="w-20 h-20 text-brand-2 text-h5 flex justify-center items-center">{{ proposal.nowPrice / proposal.targetPrice * 100 }}%</div> -->
            <ProgressBar :percent="proposal.nowPrice / proposal.targetPrice * 100" />
            <div class="flex flex-col gap-1">
              <div class="text-h2 leading-10 font-bold">NT$ {{ numberWithCommas(proposal.nowPrice) }}</div>
              <div class="text-gray-2">目標 NT$ {{ numberWithCommas(proposal.targetPrice) }}</div>
            </div>
          </div>
          <div class="flex flex-col gap-y-2 border-line border-t-1 pt-4 md:pt-6">
            <div class="flex justify-between">
              <div class="text-gray-2">贊助人數</div>
              <div class="text-gray-1">{{ proposal.nowBuyers }} 人</div>
            </div>
            <div class="flex justify-between">
              <div class="text-gray-2">贊助時間</div>

              <div class="text-gray-1">{{ timeStampChangeString(proposal.startTime) }} ~ {{ timeStampChangeString(proposal.endTime) }}</div>
            </div>
            <div class="flex justify-between">
              <div class="text-gray-2">剩餘時間</div>
              <div class="text-gray-1">{{ formatRemainingTime(proposal.endTime) }} 天</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-12 lg:mt-5 gap-2 lg:gap-10">
      <div class="w-full lg:col-span-8">
        <ul class="flex border-b-1 border-gray-4 gap-x-5 sm:gap-x-7 md:gap-16 text-gray-2">
          <li class="text-base sm:text-lg leading-30px py-4 cursor-pointer text-center border-b-4 b-b-white duration-300" :class="content === PROPOSAL.CONTENT ? 'text-gray-1 !border-brand-2' : ''" @click="contentHandler(PROPOSAL.CONTENT)">專案內容</li>
          <li v-if="proposal.placardIdList.length>0" class="text-base sm:text-lg leading-30px py-4 cursor-pointer text-center border-b-4 b-b-white duration-300" :class="content === PROPOSAL.PROCESS ? 'text-gray-1 !border-brand-2' : ''" @click="contentHandler(PROPOSAL.PROCESS)">專案進度</li>
          <li class="text-base sm:text-lg leading-30px py-4 cursor-pointer text-center border-b-4 b-b-white duration-300" :class="content === PROPOSAL.PROMISES ? 'text-gray-1 !border-brand-2' : ''" @click="contentHandler(PROPOSAL.PROMISES)">承諾及告示</li>
          <li v-if="proposal.faqIdList.length>0" class="text-base sm:text-lg leading-30px py-4 cursor-pointer text-center border-b-4 b-b-white duration-300" :class="content === PROPOSAL.FAQ ? 'text-gray-1 !border-brand-2' : ''" @click="contentHandler(PROPOSAL.FAQ)">常見問答</li>
        </ul>
        <!-- content -->
        <transition name="fade">
          <div v-show="content === PROPOSAL.CONTENT" class="py-6 md:py-10 lg:gap-10">
            <div class="ProposalContent" v-html="proposal.description"></div>
          </div>
        </transition>
        <!-- process -->
        <transition name="fade">
          <div v-show="content === PROPOSAL.PROCESS" class="py-6 md:py-10">
            <div v-if="content === PROPOSAL.PROCESS" class="flex flex-col gap-4 md:gap-6">
              <div v-for="(placard, index) in proposal.placardIdList" :key="index" class="border border-line rounded-2xl p-4 md:(px-6 py-5) flex flex-col gap-4">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                  <div class="text-gray-1 text-h5 leading-h5 md:(text-h4 leading-30px) font-medium">{{ placard.title }}</div>
                  <div class="text-brand-1 leading-h6 font-medium">{{ dateYYYYMMDD(placard.updatedAt) }}</div>
                </div>
                <div v-html="placard.content" class="text-gray-2"></div>
              </div>
            </div>
          </div>
        </transition>
        <!-- promises -->
        <transition name="fade">
          <div v-show="content === PROPOSAL.PROMISES" class="py-10">
            <div class="flex flex-col gap-4">
              <div class="text-gray-1 text-h5 leading-h5 md:(text-h4 leading-30px) font-medium">風險與挑戰</div>
              <div v-html="proposal.risk" class="text-gray-2"></div>
              <div class="text-gray-1 text-h5 leading-h5 md:(text-h4 leading-30px) font-medium">退換貨規則</div>
              <div v-html="proposal.refund" class="text-gray-2"></div>
              <div class="text-gray-1 text-h5 leading-h5 md:(text-h4 leading-30px) font-medium">聯絡方式</div>
              <div v-html=" proposal.contact " class="text-gray-2"></div>
            </div>
          </div>
        </transition>
        <!-- faq -->
        <transition name="fade">
          <div v-show="content === PROPOSAL.FAQ" class="py-10">
            <div class="flex flex-col gap-6">
              <div v-for="(faq, index) in proposal.faqIdList" :key="index" class="border border-line rounded-2xl p-4 md:(px-6 py-5) flex flex-col gap-4">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                  <div class="text-gray-1 text-h5 leading-h5 md:(text-h4 leading-30px) font-medium">{{ faq.title }}</div>
                  <div class="text-brand-1 leading-h6 font-medium">{{ dateYYYYMMDD(faq.updatedAt) }}</div>
                </div>
                <div v-html="faq.content" class="text-gray-2"></div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="flex flex-col lg:col-span-4">
      <!-- 最新公告 -->
        <div v-if="proposal.placardIdList.length > 0" class="flex flex-col gap-4 bg-brand-4 rounded-2xl px-4 md:px-6 py-5">
          <div class="text-h5 leading-h5 md:(text-h3 leading-h4) font-medium">最新消息</div>
          <div class="flex gap-4 leading-h6">
            <div class="text-brand-1">{{ dateYYYYMMDD(proposal.placardIdList[0].updatedAt) }}</div>
            <div class="text-gray-1">{{ proposal.placardIdList[0].title }}</div>
          </div>
        </div>
        <!-- 募資方案 -->
        <PlanList :data="proposal.planIdList" :class="'flex-col gap-12'" :cardClass="'w-full'"></PlanList>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
