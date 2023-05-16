<script lang="ts" setup>
import axios from 'axios'
const backendDomain = import.meta.env.VITE_APP_BACKEND_DOMAIN

const MerchantID = ref('')
const formBody = ref({
  ItemDesc: '潮到出水短 T',
  Amt: '500',
  CVSCOM: 0,
  option: ['', ''],
  CVSCOMName: '',
  CVSCOMPhone: '',
  Email: '',
  address: '',
  remark: ''
})
const moneyFlowOrder = ref({
  TradeSha: '', // 加密DATA 給藍新必填欄位 參數名不可變動
  TradeInfo: '' // 加密DATA 給藍新必填欄位 參數名不可變動
})
const orderForm = ref <HTMLFormElement | null>(null)

const proposalInfo = ref({
  specification: [
    {
      title: '顏色',
      option: ['白色', '紅色'],
      select: ''
    },
    {
      title: '尺寸',
      option: ['S', 'M', 'L'],
      select: ''
    }
  ]
})

async function submitForm(callBack:any) {
  callBack().then((result:any) => {
    // 如果通過
    if (result.valid) {
      createOrder()
    }
  })
}

const createOrder = async () => {
  try {
    const url = `${backendDomain}/sponsors/createOrder` // 後端加密api
    const res = await axios.post(url, formBody.value) // 後端加密
    const resData = res.data
    moneyFlowOrder.value.TradeSha = resData.shaEncrypt
    moneyFlowOrder.value.TradeInfo = resData.aesEncrypt
    const form:any = await orderForm.value
    form.submit() // 藍新僅接收Form Post
  } catch (error:any) {
    console.log('Encode Error:', error.message)
  }
}

onMounted(async () => {
  MerchantID.value = import.meta.env.VITE_MerchantID ? import.meta.env.VITE_MerchantID : ''
  console.log(MerchantID.value)
})
</script>

<template>
  <VForm v-slot="{ errors, validate}" as="div">
    <form ref="orderForm" action="https://ccore.newebpay.com/MPG/mpg_gateway" method="post">
      <h5 class="text-28px font-700 mb-6">方案規格</h5>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div v-for="(item,index) in proposalInfo.specification" :key="index">
          <p class="mb-4 text-6">{{ item.title }}</p>
          <VField v-model="formBody.option[index]" :name="`option${index + 1}`" as="select" :label="`募資方案規格${index + 1}`" rules="required" class="w-full text-h6 leading-h4 p-2 mb-2 rounded b border-[#ccc] focus:outline-none focus:ring-1 focus:ring-brand-1 focus:border-brand-1">
            <option value="" disabled class="text-#B0B1C8">請選擇規格</option>
            <option v-for="i in item.option" :key="i" :value="i" >{{ i }}</option>
          </VField>
          <span v-if="errors[`option${index + 1}`]" class="block text-#FF5D71 mb-3 text-14px">{{ errors[`option${index + 1}`] }}</span>
        </div>
      </div>
      <div>
        <h6 class="text-28px mb-4">物流方式 </h6>
        <ul class="flex">
          <li @click="formBody.CVSCOM = 0" class="flex items-center cursor-pointer border-b-4 border-#fff py-4 px-9 duration-300 hover:bg-brand-4 hover:border-brand-2" :class="{'bg-brand-4 border-brand-2': formBody.CVSCOM === 0}">
            宅配
          </li>
          <li  @click="formBody.CVSCOM = 3" class="flex items-center cursor-pointer border-b-4 border-#fff py-4 px-9 duration-300 hover:bg-brand-4 hover:border-brand-2"  :class="{'bg-brand-4 border-brand-2': formBody.CVSCOM === 3}">
            超商店到店
          </li>
        </ul>
      </div>
      <!-- 表單內容  宅配-->
      <div v-if="formBody.CVSCOM === 0" class="flex flex-col gap-6 bg-gray-4 py-6 px-4 mb-8">
        <div>
          <label for="CVSCOMName" class="flex text-h5 leading-h5 mb-4">
            <span class="text-#FF5D71 mr-1">*</span>
            <p>收件人姓名</p>
          </label>
          <VField v-model="formBody.CVSCOMName" name="CVSCOMName" id="CVSCOMName" label="收件人姓名" rules="required"
            class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
            :class="{'!border-#FF5D71':errors.CVSCOMName}" >
          </VField>
          <span v-if="errors.CVSCOMName" class="block text-#FF5D71 mb-3 text-14px">{{ errors.CVSCOMName }}</span>
        </div>

        <div>
          <label for="CVSCOMPhone" class="flex text-h5 leading-h5 mb-4">
            <span class="text-#FF5D71 mr-1">*</span>
            <p>收件人連絡電話</p>
          </label>
          <VField v-model="formBody.CVSCOMPhone" name="CVSCOMPhone" id="CVSCOMPhone" type="phone" label="收件人連絡電話" rules="required"
            class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
            :class="{'!border-#FF5D71':errors.CVSCOMPhone}"
          >
          </VField>
          <span v-if="errors.CVSCOMPhone" class="block text-#FF5D71 mb-3 text-14px">{{ errors.CVSCOMPhone }}</span>
        </div>

        <div>
          <label for="Email" class="flex text-h5 leading-h5 mb-4">
            <span class="text-#FF5D71 mr-1">*</span>
            <p> 收件人 Email</p>
          </label>
          <VField v-model="formBody.Email" name="Email" id="Email" label="收件人 Email" type="Email" rules="required|email"
            class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
            :class="{'!border-#FF5D71':errors.Email}"
          >
          </VField>
          <span v-if="errors.Email" class="block text-#FF5D71 mb-3 text-14px">{{ errors.Email }}</span>
        </div>

        <div>
          <label for="address" class="flex text-h5 leading-h5 mb-4">
            <span class="text-#FF5D71 mr-1">*</span>
            <p> 收件人地址</p>
          </label>
          <VField v-model="formBody.address" name="address" id="address" label="收件人地址" rules="required"
            class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
            :class="{'!border-#FF5D71':errors.address}"
          >
          </VField>
          <span v-if="errors.address" class="block text-#FF5D71 mb-3 text-14px">{{ errors.address }}</span>
        </div>

        <div>
          <label for="remark" class="flex text-h5 leading-h5 mb-4">
            <p> 備註</p>
          </label>
          <input type="text" v-model="formBody.remark" id="remark"
            class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
          >
        </div>
      </div>
      <!-- 表單內容 超商店到店 -->

      <div v-if="formBody.CVSCOM === 3" class="flex flex-col gap-6 bg-gray-4 py-6 px-4 mb-8">
        <div>
          <label for="Email" class="flex text-h5 leading-h5 mb-4">
            <span class="text-#FF5D71 mr-1">*</span>
            <p> 收件人 Email</p>
          </label>
          <VField v-model="formBody.Email" name="Email" id="Email" label="收件人 Email" type="Email" rules="required|email"
            class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
            :class="{'!border-#FF5D71':errors.Email}"
          >
          </VField>
          <span v-if="errors.Email" class="block text-#FF5D71 mb-3 text-14px">{{ errors.Email }}</span>
        </div>
        <div>
          <label for="remark" class="flex text-h5 leading-h5 mb-4">
            <p> 備註</p>
          </label>
          <input type="text" v-model="formBody.remark" id="remark"
            class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
          >
        </div>
      </div>
        <!-- 藍新 必傳參數 隱藏 -->
      <input type="hidden" name="ItemDesc" :value="formBody.ItemDesc" required />
      <input type="hidden" name="Amt" :value="formBody.Amt" required />

      <input type="hidden" name="MerchantID" :value="MerchantID" required />
      <input type="hidden" name="Version" :value="'2.0'" required />
      <input type="hidden" name="CREDIT" :value="1" required />
      <input type="hidden" name="CVSCOM" :value="formBody.CVSCOM" required />

      <input type="hidden" name="TradeSha" v-model="moneyFlowOrder.TradeSha" required />
      <input type="hidden" name="TradeInfo" v-model="moneyFlowOrder.TradeInfo" required />
      <div class="w-full flex justify-center mb-8">
        <button @click="submitForm(validate)" type="button" class="bg-brand-1 text-white px-8 py-2 rounded-full">立即贊助</button>
      </div>
    </form>
  </VForm>
</template>
