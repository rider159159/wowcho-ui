<script setup lang="ts">
import { Sponsor } from '@/interface'
import { dateTime, numberWithCommas } from '@/composables'
import { fetchSponsor } from '@/api'

const router = useRouter()
const route = useRoute()

function goProposal() {
  router.push({
    name: 'proposalContent',
    params: { proposal: sponsor.value.proposalId.customizedUrl }
  })
}

const sponsor = ref({ ...Sponsor })

async function getSponsor() {
  const query = {
    id: route.params.id
  }
  const res = await fetchSponsor.get(query)
  if (res.status !== 'Success') return
  sponsor.value = res.data
}

onMounted(() => {
  getSponsor()
})
</script>

<template>
  <div class="flex flex-col px-3 lg:px-0 py-12 md:py-20 max-w-324 flex justify-center mx-auto">
    <div class="text-h3 leading-h3 md:(text-h2 leading-h2) text-gray-1 mb-8 md:mb-14">贊助詳情</div>
    <div class="flex flex-col md:flex-row gap-2 md:gap-4 lg:gap-8">
      <!-- <div class="flex justify-center items-center w-full border-gray-1 border-2 bg-gray-4">我是為了方案保留的區域</div> -->
      <div class="flex flex-col w-full">
        <div class="text-brand-1 text-h5 leading-h5 md:(text-h4 leading-h4) font-medium border-b-1 border-line py-4">訂單資訊</div>
        <div class="flex flex-col py-4 md:py-6 gap-2 md:gap-3">
          <!-- <div class="flex gap-4">
            <div class="text-gray-2">訂單編號</div>
            <div class="text-gray-1 font-medium">{{ sponsor.MerchantOrderNo }}</div>
          </div> -->
          <div class="flex gap-4">
            <div class="text-gray-2 min-w-24">訂購時間</div>
            <div class="text-gray-1 font-medium">{{ dateTime(sponsor.updatedAt) }}</div>
          </div>
          <div class="flex gap-4">
            <div class="text-gray-2 min-w-24">專案</div>
            <div class="flex gap-2 text-brand-2 hover:text-brand-1 font-medium cursor-pointer" @click="goProposal()">
              <div>{{ sponsor.proposalId.name }}</div>
              <div class="mdi mdi-open-in-new"></div>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="text-gray-2 min-w-24">訂購方案</div>
            <div class="text-gray-1 font-medium">{{ sponsor.planId.name }}</div>
          </div>
          <div class="flex gap-4">
            <div class="text-gray-2 min-w-24">訂購規格</div>
            <div class="text-gray-1 font-medium">{{ sponsor.option.join('、') }}</div>
          </div>
          <div class="flex gap-4">
            <div class="text-gray-2 min-w-24">總金額</div>
            <div class="text-gray-1 font-medium">NT$ {{ numberWithCommas(sponsor.Amt) }}</div>
          </div>

          <div class="flex gap-4">
            <div class="text-gray-2 min-w-24">寄送方式</div>
            <div class="text-gray-1 font-medium">{{ sponsor.CVSCOM === 0 ? '宅配' : '超商店到店' }}</div>
          </div>
          <div class="flex gap-4">
            <div class="text-gray-2 min-w-24">付款方式</div>
            <div class="text-gray-1 font-medium">{{ sponsor.PaymentType === 'CREDIT' ? '信用卡' : '取貨付款' }}</div>
          </div>
          <div class="flex gap-4">
            <div class="text-gray-2 min-w-24">提案人名稱</div>
            <div class="text-gray-1 font-medium">{{ sponsor.ownerId.businessName }}</div>
          </div>
          <div class="flex gap-4">
            <div class="text-gray-2 min-w-24">提案人 Email</div>
            <div class="text-gray-1 font-medium">{{ sponsor.ownerId.businessEmail }}</div>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full">
        <div class="text-brand-1 text-h5 leading-h5 md:(text-h4 leading-h4) font-medium border-b-1 border-line py-4">收件者資訊</div>
        <div class="flex flex-col py-4 md:py-6 gap-2 md:gap-3">
          <div class="flex gap-4">
            <div class="text-gray-2 min-w-24">姓名</div>
            <div class="text-gray-1 font-medium">{{ sponsor.CVSCOMName }}</div>
          </div>
          <div class="flex gap-4">
            <div class="text-gray-2 min-w-24">電話</div>
            <div class="text-gray-1 font-medium">{{ sponsor.CVSCOMPhone }}</div>
          </div>
          <div class="flex gap-4">
            <div class="text-gray-2 min-w-24">Email</div>
            <div class="text-gray-1 font-medium">{{ sponsor.Email }}</div>
          </div>
          <!-- <div class="flex gap-4">
            <div class="text-gray-2">取件方式</div>
            <div class="text-gray-1 font-medium">{{ data.recipient.info.method }}</div>
          </div> -->
          <div class="flex gap-4">
            <div class="text-gray-2 min-w-24">取貨地點</div>
            <div class="text-gray-1 font-medium">{{ sponsor.address.length > 0 ? sponsor.address : `${sponsor.StoreType}-${sponsor.StoreName}` }}</div>
          </div>
          <div class="flex gap-4">
            <div class="text-gray-2 min-w-24">購買備註</div>
            <div class="text-gray-1 font-medium">{{ sponsor.remark || '-' }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
