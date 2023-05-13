<script lang="ts" setup>
import axios from 'axios'

// 将 EJS 變數替換成 Vue ref 或 computed 属性
const backendDomain = import.meta.env.VITE_APP_BACKEND_DOMAIN
const PayGateWayEnv = import.meta.env.VITE_PayGateWay ? import.meta.env.VITE_PayGateWay : ''
const PayGateWay = ref('')
const MerchantID = import.meta.env.VITE_MerchantID ? import.meta.env.VITE_MerchantID : ''
const Version = import.meta.env.VITE_Version ? import.meta.env.VITE_Version : ''
const ReturnURL = import.meta.env.VITE_ReturnURL ? import.meta.env.VITE_ReturnURL : ''
const NotifyURL = import.meta.env.VITE_NotifyURL ? import.meta.env.VITE_NotifyURL : ''

const title = ref('確認訂單')
const orderForm = ref <HTMLFormElement | null>(null)

const order = computed(() => ({ // 給藍新必填欄位 參數名不可變動
  ItemDesc: 'Chelly牌雨傘', // 商品品名
  Amt: 100, // 訂單金額
  Email: 'wowcho2023@gmail.com', // 付款人信箱 （非收件人
  TimeStamp: '', // 時間戳記
  MerchantOrderNo: '', // 商店訂單編號
  ReturnURL, // 支付完成 返回商店網址
  NotifyURL, // 支付通知網址
  EncryptType: 0, // 加密模式 AES256方式加密參帶0, AES GCM方式加密帶1
  CREDIT: 1, // 信用卡一次付清 1=啟用 0=不啟用
  CVSCOM: 0 // 物流啟用(方式) 店到店物流啟用 3=啟用超商取貨不付款及超商取貨付款 0=不開啟店到店(郵寄）
}))
const enOrder = reactive({
  order: {}, // 未加密
  TradeSha: '', // 加密DATA 給藍新必填欄位 參數名不可變動
  TradeInfo: '', // 加密DATA 給藍新必填欄位 參數名不可變動
  TimeStamp: '',
  MerchantOrderNo: ''
})

// 使用深拷貝物件，將循環引用的屬性替換為指定值
// 使用一個名為 deepClone 的遞迴函式來實現深拷貝，並在遇到循環引用時將其替換為 null
const deepClone = (obj:any, seen = new WeakSet()) => {
  if (typeof obj !== 'object' || obj === null) return obj
  if (seen.has(obj)) return null

  seen.add(obj)
  const newObj = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    // @ts-ignore
    newObj[key] = deepClone(obj[key], seen)
  }
  return newObj
}

const createOrder = async () => {
  try {
    const url = `${backendDomain}/pay/createOrder` // 後端加密api
    const cleanOrder = deepClone(order.value)
    const res = await axios.post(url, cleanOrder) // 後端加密
    console.log(res)
    const resData = res.data
    enOrder.order = resData.order
    enOrder.TradeSha = resData.shaEncrypt
    enOrder.TradeInfo = resData.aesEncrypt
    // const form = await $refs.orderForm
    orderForm.value?.submit() // 藍新僅接收Form Post
  } catch (error:any) {
    console.log('Encode Error:', error.message)
  }
}

onMounted(async () => {
  PayGateWay.value = PayGateWayEnv
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
    選擇贊助方式 {{  PayGateWay }}
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
      <input type="hidden" name="ReturnURL" :value="order.ReturnURL" required />
      <input type="hidden" name="NotifyURL" :value="order.NotifyURL" required />

      <input type="hidden" name="TimeStamp" :value="enOrder.TimeStamp" required />
      <input type="hidden" name="MerchantOrderNo" :value="enOrder.MerchantOrderNo" required />
      <input type="hidden" name="TradeSha" v-model="enOrder.TradeSha" required />
      <input type="hidden" name="TradeInfo" v-model="enOrder.TradeInfo" required />

      <button type="submit">已確認訂單金額，選擇支付方式</button>
    </form>
  </div>
  <div v-else>
    Loading...
  </div>

</template>
