<script setup lang="ts">
interface IPlan {
  _id: string,
  // 募資活動(主表) id
  proposalUrl: string
  // 圖片網址
  image:string,
  // 方案名稱
  name:string,
  // 活動簡介
  summary:string,
  // 募資方案原價
  originalPrice:number,
  // 募資方案折扣價格 (實際價格)
  actualPrice:number,
  // 募資商品數量
  quantity: number
  // 該方案已賣出數量
  nowBuyers: number,
  // 出貨日期
  pickupDate:number,
  // 給贊助者的話
  toSponsor: string,
  // 募資方案 - 規格，規格標題、選項
  specification:[{ title:string, option:Array<string> }]

  // 本島運費
  freightMainIsland:number | null,
  // 離島運費
  freightOuterIsland:number | null,
  // 其他國家運費
  freightOtherCountries:number | null,
}

const props = defineProps<{
  data: IPlan[],
  class: String
    // type: String,
  cardClass:String,
  proposalStatus:number
}>()
</script>

<template>
  <div class="flex gap-x-4 w-full pt-10" :class="props.class">
    <PlanCard
      v-for="(item, key) in props.data"
      :key="key"
      class="grow-0 shrink-0"
      :class="props.cardClass"
      :id="item._id"
      :title="item.name"
      :image="item.image"
      :price="item.actualPrice"
      :origin-price="item.originalPrice"
      :pickupDate="item.pickupDate"
      discount-text="5折"
      :count="item.quantity"
      :content="item.summary"
      :proposal-status="props.proposalStatus"
      shipping="出貨方式 : 現貨商品<br>本島免運 / 外島 150 元 / 港澳 300 元"
    />
    <!--  spot-goods="岩石灰、午夜藍、藤黃色、灰棕色 ( 其他缺貨中 )" -->
  </div>
</template>
