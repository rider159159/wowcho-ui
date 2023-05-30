<script setup lang="ts">
import { ref, onMounted } from 'vue'
const route = useRoute()
const result = ref<any>({})

onMounted(async () => {
  try {
    const { ...queryResult } = route.query
    result.value = queryResult // 將路由查詢結果指派給 result
    // console.log(toRaw(result.value));
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})
</script>

<template>
  <div class="bg-blue-200 pt-50px pb-30px">
    <p class="text-center p-30px text-h1 text-brand1">
      <span class="mdi mdi-bullhorn-variant text-brand2"></span>
      {{result.title}}
    </p>

    <div class="md-w-50% w-90% m-a">
      <div class="jagged-top"></div>

      <div class="w-full bg-white md-py-40px py-30px px-50px">
        <!-- ------------ 商店資訊 ------------ -->
        <div class="text-center border-b-1 pb-2 mb-4 text-gray2 flex items-center justify-center">
          <span class="mdi mdi-storefront-outline text-20px pr-3px text-brand"></span>
          商店資訊
        </div>
        <div class="itemList">
          <b class="text-brand3">商店訂單編號：</b><span class="justify-self-end">{{ result.MerchantOrderNo }}</span>
        </div>
        <div class="itemList">
          <b class="text-brand3">藍新金流交易序號：</b><span>{{ result.TradeNo }}</span>
        </div>
        <div class="itemList">
          <b class="text-brand3">商品名稱：</b><span>{{ result.ItemDesc }}</span>
        </div>

        <!-- ------------ 付款資訊 ------------ -->
        <div class="text-center border-b-1 pb-2 mt-8 mb-4 text-gray2 flex items-center justify-center">
          <span class="mdi mdi-currency-usd text-20px pr-3px"></span>
          付款資訊
        </div>
        <div class="itemList">
          <b class="text-brand3">付款方式：</b>
          <span v-if="result.PaymentType == 'CREDIT'">信用卡付款</span>
          <span v-if="result.PaymentType == 'WEBATM'">WEBATM</span>
          <span v-if="result.PaymentType == 'CVSCOM'">{{`${result.StoreType} - 超商取貨付款`}}</span>
        </div>

        <div v-if="result.PaymentType == 'CREDIT'">
          <div class="itemList">
            <b class="text-brand3">信用卡授權碼：</b><span>{{ result.Auth }}</span>
          </div>
          <div class="itemList" v-if="result.Card6No && result.Card4No">
            <b class="text-brand3">信用卡號：</b><span>{{result.Card6No}}******{{result.Card4No}}</span>
          </div>
        </div>

        <div class="itemList">
          <b class="text-brand3">交易時間：</b><span>{{ `${result.PayTime?.slice(0, 10)} ${result.PayTime?.slice(10)}` }}</span>
        </div>
        <div class="itemList">
          <b class="text-brand3">交易結果：</b>
          <span class="text-red">{{ result.Message }}</span>
          ({{result.Status == 'SUCCESS' ? 'Success' : 'Failed'}})
        </div>
        <div class="itemList">
          <b class="text-brand3">付款金額：</b><span class="text-h4">NT${{ result.Amt }}</span>
        </div>

        <!-- ------------ 物流資訊 ------------ -->
        <div v-if="result.TradeType === '1' || result.TradeType === '3' ">
          <div class="text-center border-b-1 pb-2 mt-8 mb-4 text-gray2 flex items-center justify-center">
            <span class="mdi mdi-truck-cargo-container text-20px pr-3px"></span>
            物流資訊
          </div>
          <div class="itemList">
            <b class="text-brand3">超商名稱：</b><span>{{ result.StoreType }}</span>
          </div>
          <div class="itemList">
            <b class="text-brand3">取貨門市：</b><span v-if="result.StoreName ">{{ result.StoreName }}</span> - <span v-if="result.StoreAddr">{{ result.StoreAddr }}</span>
          </div>
          <div class="itemList">
            <b class="text-brand3">取件人姓名：</b><span>{{ result.CVSCOMName }}</span>
          </div>
          <div class="itemList">
            <b class="text-brand3">取件人行動電話：</b><span>{{ result.CVSCOMPhone }}</span>
          </div>
        </div>

      </div>

      <div class="jagged-bottom"></div>
    </div>
  </div>
</template>
