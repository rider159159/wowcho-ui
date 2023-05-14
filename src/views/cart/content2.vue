<script lang="ts" setup>
import axios from 'axios'

// 将 EJS 變數替換成 Vue ref 或 computed 属性
const backendDomain = import.meta.env.VITE_APP_BACKEND_DOMAIN
// const PayGateWayEnv =
const PayGateWay = ref('')
const MerchantID = ref('')
const Version = ref('')

const title = ref('確認訂單')
const orderForm = ref <HTMLFormElement | null>(null)

const order = ref({
  ItemDesc: 'Chelly 牌雨傘',
  Amt: 100, // 訂單金額
  Email: 'wowcho2023@gmail.com', // 付款人信箱 （非收件人
  TimeStamp: '', // 時間戳記
  MerchantOrderNo: '', // 商店訂單編號
  EncryptType: 0, // 加密模式 AES256方式加密參帶0, AES GCM方式加密帶1
  CREDIT: 1, // 信用卡一次付清 1=啟用 0=不啟用
  CVSCOM: 0 //
})

const payInfo = reactive({
  order: {}, // 未加密
  TradeSha: '', // 加密DATA 給藍新必填欄位 參數名不可變動
  TradeInfo: '', // 加密DATA 給藍新必填欄位 參數名不可變動
  TimeStamp: '',
  MerchantOrderNo: ''
})

// 使用深拷貝物件，將循環引用的屬性替換為指定值
// 使用一個名為 deepClone 的遞迴函式來實現深拷貝，並在遇到循環引用時將其替換為 null

const createOrder = async () => {
  try {
    const url = `${backendDomain}/pay/createOrder` // 後端加密api
    const res = await axios.post(url, order.value) // 後端加密
    const resData = res.data
    payInfo.TradeSha = resData.shaEncrypt
    payInfo.TradeInfo = resData.aesEncrypt
    const form:any = await orderForm.value
    form.submit() // 藍新僅接收Form Post
  } catch (error:any) {
    console.log('Encode Error:', error.message)
  }
}

onMounted(async () => {
  PayGateWay.value = import.meta.env.VITE_PayGateWay ? import.meta.env.VITE_PayGateWay : ''
  MerchantID.value = import.meta.env.VITE_MerchantID ? import.meta.env.VITE_MerchantID : ''
  Version.value = import.meta.env.VITE_Version ? import.meta.env.VITE_Version : ''
})

// defineExpose({
//   orderForm,
//   createOrder
// })

</script>

<script setup lang="ts">
</script>

<template>
  <div v-if="order">
    選擇贊助方式
    <h2>
      {{ title }}
    </h2>
    <form ref="orderForm" @submit.prevent="createOrder" :action="PayGateWay" method="post">
      <div>
        <label>商品品名:</label> {{ order.ItemDesc }}
        <input type="hidden" name="ItemDesc" :value="order.ItemDesc" required />
      </div>
      <div>
        <label>訂單金額: </label> {{ order.Amt}} 元
        <input type="hidden" name="Amt" :value="order.Amt" required />
      </div>
      <div>
        <label>物流方式: </label>
        <label><input type="radio" name="CVSCOM" v-model.number="order.CVSCOM" value="0" required />郵寄</label>
        <label><input type="radio" name="CVSCOM" v-model.number="order.CVSCOM" value="3" required />超商店到店</label>
      </div>
      <div>
        <label for="Email">
          付款人 Email:
          <input type="email" id="Email" name="Email" v-model="order.Email" required />
        </label>
      </div>

      <!-- 必傳參數 -->
      <input type="hidden" name="MerchantID" :value="MerchantID" required />
      <input type="hidden" name="Version" :value="Version" required />
      <input type="hidden" name="CREDIT" :value="order.CREDIT" required />
      <input type="hidden" name="CVSCOM" :value="order.CVSCOM" required />

      <input type="hidden" name="TradeSha" v-model="payInfo.TradeSha" required />
      <input type="hidden" name="TradeInfo" v-model="payInfo.TradeInfo" required />

      <button type="submit">已確認訂單金額，選擇支付方式</button>
    </form>
  </div>
  <div v-else>
    Loading...
  </div>

</template>
