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
          <div class="flex gap-4">
            <div class="text-gray-2">訂單編號</div>
            <div class="text-gray-1 font-medium">{{ sponsor.MerchantOrderNo }}</div>
          </div>
          <div class="flex gap-4">
            <div class="text-gray-2">訂購時間</div>
            <div class="text-gray-1 font-medium">{{ dateTime(sponsor.PayTime) }}</div>
          </div>
          <div class="flex gap-4">
            <div class="text-gray-2">專案</div>

            <div @click="goProposal()"  class="flex gap-2 text-brand-2 hover:text-brand-1 font-medium cursor-pointer">
              <div>{{ sponsor.proposalId.name }}</div>
              <div class="mdi mdi-open-in-new"></div>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="text-gray-2">訂購方案</div>
            <div class="text-gray-1 font-medium">{{ sponsor.planId.name }}</div>
          </div>
          <div class="flex gap-4">
            <div class="text-gray-2">訂購規格</div>
            <div class="text-gray-1 font-medium">{{ sponsor.option.join('、') }}</div>
          </div>
          <div class="flex gap-4">
            <div class="text-gray-2">總金額</div>
            <div class="text-gray-1 font-medium">NT$ {{ numberWithCommas(sponsor.Amt) }}</div>
          </div>
          <!-- <div class="flex gap-4">
            <div class="text-gray-2">運費</div>
            <div class="text-gray-1 font-medium">NT$ {{ numberWithCommas(data.order.freight) }}</div>
          </div> -->
          <div class="flex gap-4">
            <div class="text-gray-2">付款方式</div>
            <!-- <div class="text-gray-1 font-medium">{{ sponsor.PaymentType === 'CREDIT' ? '信用卡' : '店到店' }}</div> -->
          </div>
          <!-- <div class="flex gap-4">
            <div class="text-gray-2">訂單狀態</div>
            <div class="font-medium" :class="!(data.order.orderStatus === E_ORDER_STATUS.CANCELED) ? 'text-green' : 'text-red'">{{ ORDER_STATUS[data.order.orderStatus] }}</div>
          </div> -->
          <!-- <div class="flex gap-4">
            <div class="text-gray-2">物流方式</div>
            <div class="text-gray-1 font-medium">{{ data.order.logistics }}</div>
          </div>
          <div class="flex gap-4">
            <div class="text-gray-2">出貨狀態</div>
            <div class="font-medium" :class="data.order.shippingStatus === E_SHIPPING_STATUS.SHIPPED ? 'text-green' : 'text-red'">{{ SHIPPING_STATUS[data.order.shippingStatus] }}</div>
          </div> -->
        </div>
      </div>
      <div class="flex flex-col w-full">
        <div class="text-brand-1 text-h5 leading-h5 md:(text-h4 leading-h4) font-medium border-b-1 border-line py-4">收件者資訊</div>
        <div class="flex flex-col py-4 md:py-6 gap-2 md:gap-3">
          <div class="flex gap-4">
            <div class="text-gray-2">姓名</div>
            <div class="text-gray-1 font-medium">{{ sponsor.CVSCOMName }}</div>
          </div>
          <div class="flex gap-4">
            <div class="text-gray-2">電話</div>
            <div class="text-gray-1 font-medium">{{ sponsor.CVSCOMPhone }}</div>
          </div>
          <div class="flex gap-4">
            <div class="text-gray-2">Email</div>
            <div class="text-gray-1 font-medium">{{ sponsor.Email }}</div>
          </div>
          <!-- <div class="flex gap-4">
            <div class="text-gray-2">取件方式</div>
            <div class="text-gray-1 font-medium">{{ data.recipient.info.method }}</div>
          </div> -->
          <div class="flex gap-4">
            <div class="text-gray-2">取貨地點</div>
            <div class="text-gray-1 font-medium">{{ sponsor.address.length > 0 ? sponsor.address : `${sponsor.StoreType}-${sponsor.StoreName}` }}</div>
          </div>
          <!-- <div class="flex gap-4">
            <div class="text-gray-2">物流寄件編號</div>
            <div class="text-gray-1 font-medium">{{ data.recipient.info.trackingId }}</div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>
