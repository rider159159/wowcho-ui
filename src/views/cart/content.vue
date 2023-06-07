<script lang="ts" setup>
import { fetchProposal, fetchSponsor } from '@/api'
import { SponsorFormBody } from '@/interface'
const route = useRoute()

let MerchantID = ''
const formBody = ref({ ...SponsorFormBody })
const moneyFlowOrder = ref({
  TradeSha: '', // 加密DATA 給藍新必填欄位 參數名不可變動
  TradeInfo: '' // 加密DATA 給藍新必填欄位 參數名不可變動
})
const formHtml = ref <HTMLFormElement | null>(null)

async function submitForm(callBack:any) {
  callBack().then((result:any) => {
    // 表單驗證通過
    if (result.valid) {
      createOrder()
    }
  })
}

// 新增訂單
const createOrder = async () => {
  const orderForm = JSON.parse(JSON.stringify(formBody.value))
  // 提案 proposal URL (等同 ID)
  orderForm.customizedUrl = proposal.value.customizedUrl
  orderForm.proposalId = proposal.value._id
  // 提案擁有者
  orderForm.ownerId = proposal.value.ownerId
  // 添加方案 ID
  orderForm.planId = plan.value._id
  // 添加提案名稱
  orderForm.projectTitle = plan.value.name
  const res = await fetchSponsor.create(orderForm)
  if (res.status !== 'Success') return
  // 將加密後資訊塞至 input
  moneyFlowOrder.value.TradeSha = res.data.shaEncrypt
  moneyFlowOrder.value.TradeInfo = res.data.aesEncrypt
  const form:any = await formHtml.value
  form.submit() // 藍新僅接收Form Post
}

const proposal:any = ref({})
const plan:any = ref({
  name: '',
  actualPrice: 0
})

async function getProposalCart () {
  const query = {
    id: route.query.id
  }
  const res = await fetchProposal.getCart(query)
  if (res.status !== 'Success') return
  proposal.value = res.data.proposal
  plan.value = res.data.plan
  // formbody 規格陣列塞值，讓驗證功能正確
  plan.value.specification.forEach((item:any) => formBody.value.option.push(''))
  formBody.value.ItemDesc = plan.value.name
  formBody.value.Amt = plan.value.actualPrice
}
onMounted(async () => {
  MerchantID = import.meta.env.VITE_MerchantID ? import.meta.env.VITE_MerchantID : ''
  getProposalCart()
})
</script>

<template>
  <section>
    <div class="b-b b-gray3 mb-6 lg:mb-4">
      <ToCartPlanCard
        :image="proposal.image"
        :title="proposal.name"
        :subtitle="proposal.summary"
        :current-price="proposal.nowPrice"
        :target-price="proposal.targetPrice"
        :end-time="proposal.endTime"
      />
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div class="col-span-1">
        <PlanCard
          class="mb-15"
          :id="plan._id"
          :title="plan.name"
          :image="plan.image"
          :price="plan.actualPrice"
          :origin-price="plan.originalPrice"
          :count="plan.quantity"
          :content="plan.summary"
          :type="'car'"
        ></PlanCard>
        <div class="w-full">
          <div class="flex w-full justify-between text-14px">
            <p>選項金額</p>
            <div>{{ plan.actualPrice.toLocaleString() }}</div>
          </div>
          <div class="flex w-full justify-between text-14px b-gray-3 border-b-3 py-4">
            <p>運費 ：N/A</p>
            <div>+ (未知)</div>
          </div>
          <div class="flex w-full justify-between text-h5 pt-4">
            <p>選項金額</p>
            <div>{{ plan.actualPrice.toLocaleString() }}</div>
          </div>
        </div>
      </div>
      <div class="col-span-1 lg:col-span-2">
        <VForm v-slot="{ errors, validate}" as="div">
          <form ref="formHtml" action="https://ccore.newebpay.com/MPG/mpg_gateway" method="post">
            <h5 class="text-28px font-700 mb-6">方案規格</h5>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div v-for="(item,index) in plan.specification" :key="index">
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
              <!-- 商品品名 -->
            <input type="hidden" name="ItemDesc" :value="plan.name" />
            <!-- 商品價格 -->
            <input type="hidden" name="Amt" :value="plan.actualPrice" />

            <input type="hidden" name="MerchantID" :value="MerchantID" />
            <!-- 藍新版本 -->
            <input type="hidden" name="Version" :value="'2.0'" />
            <!-- 是否啟用信卡一次付清 -->
            <input type="hidden" name="CREDIT" :value="1" />
            <!-- 物流方式 -->
            <input type="hidden" name="CVSCOM" :value="formBody.CVSCOM" />

            <input type="hidden" name="TradeSha" v-model="moneyFlowOrder.TradeSha" />
            <input type="hidden" name="TradeInfo" v-model="moneyFlowOrder.TradeInfo" />
            <div class="w-full flex mb-8">
              <button @click="submitForm(validate)" type="button" class="px-8 py-2 rounded-full bg-brand-1 text-white outline outline-2 duration-300 outline-brand-1 hover:bg-white hover:text-brand-1">
                立即贊助 NT$ {{ plan.actualPrice.toLocaleString() }}
              </button>
            </div>
          </form>
        </VForm>
      </div>
    </div>
  </section>
</template>
