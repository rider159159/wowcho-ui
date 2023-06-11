<!-- eslint-disable no-unused-vars -->
<script lang="ts" setup>
// composables
import { numberWithCommas, calculateDiscount, calcTargetPrice, timeStampChangeString, dateWithDashYYYYMMDD, formatRemainingTime, formatDateAccomplish } from '@/composables'
import { fetchProposal } from '@/api'
enum PROPOSAL {
  CONTENT, PROCESS, PROMISES, FAQ
}

const data = {
  image: 'https://media.4-paws.org/f/3/9/1/f39115c5c798651f95141c37b692f76b669af761/VIER%20PFOTEN_2019-03-15_001-2886x1999-1920x1330.webp',
  video: 'https://www.youtube.com',
  title: '潮到出水短T',
  category: '設計',
  owner: '雨傘富翁',
  summary: '日本專利防水牛皮革，好清潔不易髒污。',
  content: '日本專利防水牛皮革，好清潔不易髒污。特別剪裁設計即使裝滿物品也不會塌陷變型，隨時保持俐落有精神！。',
  targetPrice: 6088000,
  currentMoney: 4566000,
  donateNumber: 321,
  startTime: 1682870400000, // 2023-05-01 0:0:0
  endTime: 1688054400000, // 2023-06-30 0:0:0
  plans: {
    name: '超早鳥-潮到出水短T',
    actualPrice: 500,
    originalPrice: 800,
    quantity: 100,
    pickupDate: 213131223123,
    imageUrl: 'https://i.imgur.com/gpDp7ig.jpeg',
    summary: '· 發票需統編完整抬頭請留於備註欄· 預計5月上旬出貨',
    freightMainIsland: 0,
    freightOuterIsland: 0,
    freightOtherCountres: 0,
    toSponsor: 'xxx',
    specification: [
      {
        title: '顏色',
        option: ['白色', '紅色']
      }
    ]
  },
  contact: '聯絡方式',
  risk: '風險與挑戰',
  refund: '- 退換貨方式1\r\n - 退換貨方式2'
}

const list = [
  {
    title: '回饋追加~環保雨傘發貨中！',
    content: '募資活動成功，募資團隊決定加碼回饋支持者們。\n早鳥方案的朋朋們，會收到雨傘保養組。\n連同商品一起寄出。',
    createdAt: '2023/01/31',
    updatedAt: '2023/01/31'
  },
  {
    title: '工廠品質問題，重新開模中',
    content: '募資活動成功，募資團隊決定加碼回饋支持者們。\n早鳥方案的朋朋們，會收到雨傘保養組。\n連同商品一起寄出。',
    createdAt: '2023/01/20',
    updatedAt: '2023/01/20'
  },
  {
    title: '募資活動成功,開模製作中!',
    content: '募資活動成功，募資團隊決定加碼回饋支持者們。\n早鳥方案的朋朋們，會收到雨傘保養組。\n連同商品一起寄出。',
    createdAt: '2022/12/20',
    updatedAt: '2022/12/20'
  }
]

const faqs = [
  {
    title: '如何更改訂單？',
    content: '結帳完成後，即無法進行購買項目的修改，如需更改項目，建議您直接重新購買欲購入的品項後（避免錯過限量），再取消不需要的訂單！\n取消訂單的方式：寫信到客服提供贊助編號，告知您要取消此筆訂單，小幫手就會協助退款。',
    createdAt: '2022/12/20',
    updatedAt: '2022/12/20'
  },
  {
    title: '如果我想更改地址、收件資訊、款式等，可以如何修改？',
    content: '請您參考以下修改教學進行訂單修改。\n①　登入嘖嘖（記得使用當時贊助的帳號）\n②　點選右上角個人頭像，選擇「贊助記錄」\n③　成功贊助紀錄中，找到購買的方案，選擇「修改／查看紀錄」\n④　就可以修改你的：收件人姓名、電話、地址、備註資訊\n⑤　記得按下「儲存」才會完成修改',
    createdAt: '2022/12/20',
    updatedAt: '2022/12/20'
  }
]

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
  }
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
  <div class="flex flex-col gap-5">
    <div class="flex gap-4 text-xl">
      <p>提案人</p>
      <RouterLink :to="`/users/${proposal.ownerId._id}`" class="text-brand-1 font-medium">{{ proposal.ownerId.businessName }}</RouterLink>
    </div>
    <h1 class="text-h3 leading-h3 md:(text-h2 leading-h2)">{{ proposal.name }}</h1>
    <div class="flex flex-col lg:flex-row mt-3 md:mt-5 gap-4 lg:gap-10">
      <img class="lg:w-70% object-cover aspect-9/5 rounded-2xl" :src="proposal.image" />
      <div class="flex flex-col justify-between gap-6 lg:w-98">
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
          <div class="flex flex-col gap-2 md:gap-6 border-line border-t-1 pt-4 md:pt-6">
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
        <my-button class="my-2 md:my-0 bg-brand-1 hover:bg-brand-2 text-white">贊助專案</my-button>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row justify-between lg:mt-5 gap-2 lg:gap-10">
      <div class="w-full lg:max-w-210">
        <ul class="flex border-b-1 border-gray-4 gap-7 md:gap-16 text-gray-2">
          <li class="text-lg leading-30px py-4 cursor-pointer text-center" :class="content === PROPOSAL.CONTENT ? 'text-gray-1 border-b-4 border-brand-2' : ''" @click="contentHandler(PROPOSAL.CONTENT)">專案內容</li>
          <li class="text-lg leading-30px py-4 cursor-pointer text-center" :class="content === PROPOSAL.PROCESS ? 'text-gray-1 border-b-4 border-brand-2' : ''" @click="contentHandler(PROPOSAL.PROCESS)">專案進度</li>
          <li class="text-lg leading-30px py-4 cursor-pointer text-center" :class="content === PROPOSAL.PROMISES ? 'text-gray-1 border-b-4 border-brand-2' : ''" @click="contentHandler(PROPOSAL.PROMISES)">承諾及告示</li>
          <li class="text-lg leading-30px py-4 cursor-pointer text-center" :class="content === PROPOSAL.FAQ ? 'text-gray-1 border-b-4 border-brand-2' : ''" @click="contentHandler(PROPOSAL.FAQ)">常見問答</li>
        </ul>
        <!-- content -->
        <div class="py-6 md:py-10 w-full" :class="content === PROPOSAL.CONTENT ? 'block' : 'hidden'">

          <div class="ProposalContent w-full" v-html="proposal.description"></div>
        </div>
        <!-- process -->
        <div class="py-6 md:py-10" :class="content === PROPOSAL.PROCESS ? 'block' : 'hidden'">
          <div class="flex flex-col gap-4 md:gap-6">
            <div v-for="(placard, index) in list" :key="index" class="border border-line rounded-2xl p-4 md:(px-6 py-5) flex flex-col gap-4">
              <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div class="text-gray-1 text-h5 leading-h5 md:(text-h4 leading-30px) font-medium">{{ placard.title }}</div>
                <div class="text-brand-1 leading-h6 font-medium">{{ placard.createdAt }}</div>
              </div>
              <div class="text-gray-2">{{ placard.content }}</div>
            </div>
          </div>
        </div>
        <!-- promises -->
        <div class="py-10" :class="content === PROPOSAL.PROMISES ? 'block' : 'hidden'">
          <div class="flex flex-col gap-4">
            <div class="text-gray-1 text-h5 leading-h5 md:(text-h4 leading-30px) font-medium">風險與挑戰</div>
            <div class="text-gray-2">{{ data.risk }}</div>
            <div class="text-gray-1 text-h5 leading-h5 md:(text-h4 leading-30px) font-medium">退換貨規則</div>
            <div class="text-gray-2">{{ data.refund }}</div>
            <div class="text-gray-1 text-h5 leading-h5 md:(text-h4 leading-30px) font-medium">聯絡方式</div>
            <div class="text-gray-2">{{ data.contact }}</div>
          </div>
        </div>
        <!-- faq -->
        <div class="py-10" :class="content === PROPOSAL.FAQ ? 'block' : 'hidden'">
          <div class="flex flex-col gap-6">
            <div v-for="(faq, index) in faqs" :key="index" class="border border-line rounded-2xl p-4 md:(px-6 py-5) flex flex-col gap-4">
              <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div class="text-gray-1 text-h5 leading-h5 md:(text-h4 leading-30px) font-medium">{{ faq.title }}</div>
                <div class="text-brand-1 leading-h6 font-medium">{{ faq.createdAt }}</div>
              </div>
              <div class="text-gray-2">{{ faq.content }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col lg:w-350px xl:w-98">
        <div class="flex flex-col gap-4 bg-brand-4 rounded-2xl px-4 md:px-6 py-5">
          <div class="text-h5 leading-h5 md:(text-h3 leading-h4) font-medium">最新消息</div>
          <div class="flex gap-4 leading-h6">
            <div class="text-brand-1">2023/01/31</div>
            <div class="text-gray-1">回饋追加~環保雨傘發貨中！</div>
          </div>
        </div>
        <!-- 募資方案 -->
        <!-- <PlanList :data="proposal.planIdList" :class="'flex-col gap-12'" :cardClass="'!w-90'"></PlanList> -->
        <PlanList :data="proposal.planIdList" :class="'flex-col gap-12'" :cardClass="'w-full'"></PlanList>
      </div>
    </div>
  </div>
</template>
