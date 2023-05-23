<script lang="ts" setup>
const router = useRouter()
const projectsList = ref([
  {
    title: '日本BROSKI 防水真皮背包｜不怕淋雨高質感牛皮革、包身立體不變型【嘖嘖人氣好評贊助第二彈】',
    image: './test.webp',
    id: 'revopoint-range-1'
  },
  {
    title: '日本BROSKI 防水真皮背包｜不怕淋雨高質感牛皮革、包身立體不變型【嘖嘖人氣好評贊助第二彈】',
    image: './test.webp',
    id: 'revopoint-range-2'
  },
  {
    title: '日本BROSKI 防水真皮背包｜不怕淋雨高質感牛皮革、包身立體不變型【嘖嘖人氣好評贊助第二彈】',
    image: './test.webp',
    id: 'revopoint-range-3'
  }
])

function toProject (item:any) {
  router.push({
    name: 'projects',
    params: {
      id: item.id
    }
  })
}

const selectCategory = ref('社會')

// 假資料
const lists = ref({
  社會: [
    'a000000001',
    'a000000002'
  ],
  影音: [
    'b000000001',
    'b000000002'
  ],
  出版: [
    'c000000001',
    'c000000002'
  ],
  娛樂: [
    'd000000001',
    'd000000002'
  ],
  生活: [
    'e000000001',
    'e000000002'
  ],
  設計: [
    'f000000001',
    'f000000002'
  ],
  科技: [
    'g000000001',
    'g000000002'
  ],
  休閒: [
    'h000000001',
    'h000000002'
  ]
})
</script>

<template>
  <!-- Banner -->
  <div class="container lg:flex px-5 md:px-0 mx-auto mt-24 mb-16 md:mb-40">
    <div class="mr-6">
      <p class="text-brand-1 text-lg md:text-2lg font-medium mb-3 md:mb-4">Create value, share success!</p>
      <h2 class="font-bold text-3xl md:text-4xl mb-4 md:mb-6">支持夢想創造價值，<br>共享成功！</h2>
      <p class="mb-6 md:mb-10">每一位賣家都有著獨特的想法和夢想，透過我們的平台而實現。我們的使命是幫助賣家們創造價值，並與支持者共享成功。
  透過我們的平台，賣家們可以輕鬆地進行募資活動，並透過與支持者的互動，得到寶貴的反饋和建議。</p>
      <div class="flex items-center gap-x-3">
        <MyButton class="w-1/2 md:w-auto bg-white text-brand-1 outline outline-2 outline-brand-1 hover:bg-brand-1 hover:text-white">
          我想提案
        </MyButton>
        <MyButton class="w-1/2 md:w-auto bg-brand-1 text-white outline outline-2 outline-brand-1 hover:bg-white hover:text-brand-1">
          我想贊助
        </MyButton>
      </div>
    </div>
    <img src="/banner.png" alt="Banner">
  </div>
  <!-- 募資直播 -->
  <ProductCardList
    class="px-5 md:px-0"
    title="募資直播  Celebrities  Live"
    subtitle="與名人網紅直播互動"
    :is-live="true"
  />
  <!-- 募資專案類別 -->
  <Carousel
    :list="lists[selectCategory]"
    :slidesPerView="3"
  />
  <div class="bg-categories | bg-brand-4 flex flex-col justify-content items-center pt-8 pb-10 md:pt-20 md:pb-22 mb-8 md:mb-20">
    <h2 class="text-3xl font-bold md:text-4xl mb-6 md:mb-8">募資專案類別</h2>
    <ul class="flex justify-center items-center flex-wrap w-75 text-gray-2 font-medium md:w-auto">
      <li class="md:text-2xl border-r-1 brand-#C2D7EA pr-5 md:pr-6 mr-5 md:mr-6 mb-7 md:mb-0">
        <a class="cursor-pointer" @click.prevent="selectCategory = '社會'">社會</a>
      </li>
      <li class="md:text-2xl border-r-1 brand-#C2D7EA pr-5 md:pr-6 mr-5 md:mr-6 mb-7 md:mb-0">
        <a class="cursor-pointer" @click.prevent="selectCategory = '影音'">影音</a>
      </li>
      <li class="md:text-2xl border-r-1 brand-#C2D7EA pr-5 md:pr-6 mr-5 md:mr-6 mb-7 md:mb-0">
        <a class="cursor-pointer" @click.prevent="selectCategory = '出版'">出版</a>
      </li>
      <li class="md:text-2xl border-r-1 md:brand-#C2D7EA md:pr-6 md:mr-6 mb-7 md:mb-0">
        <a class="cursor-pointer" @click.prevent="selectCategory = '娛樂'">娛樂</a>
      </li>
      <li class="md:text-2xl border-r-1 brand-#C2D7EA pr-5 md:pr-6 mr-5 md:mr-6 md:mb-0">
        <a class="cursor-pointer" @click.prevent="selectCategory = '生活'">生活</a>
      </li>
      <li class="md:text-2xl border-r-1 brand-#C2D7EA pr-5 md:pr-6 mr-5 md:mr-6 md:mb-0">
        <a class="cursor-pointer" @click.prevent="selectCategory = '設計'">設計</a>
      </li>
      <li class="md:text-2xl border-r-1 brand-#C2D7EA pr-5 md:pr-6 mr-5 md:mr-6 md:mb-0">
        <a class="cursor-pointer" @click.prevent="selectCategory = '科技'">科技</a>
      </li>
      <li class="md:text-2xl md:mb-0">
        <a class="cursor-pointer" @click.prevent="selectCategory = '休閒'">休閒</a>
      </li>
    </ul>
  </div>
  <!-- 熱門精選 -->
  <ProductCardList
    class="px-5 md:px-0"
    title="熱門精選  MOST MOMENTUM"
    subtitle="最近幾天籌集到最多資金的產品"
  />
  <!-- 最近推出 -->
  <ProductCardList
    class="px-5 md:px-0"
    title="最近推出 RECENTLY LAUNCHED"
    subtitle="最近推出的產品"
  />
  <!-- 信任承諾 -->
  <div class="container px-5 md:px-0 mx-auto">
    <p class="text-center font-bold text-2xl md:text-3xl mb-2 md:mb-6">給予贊助者的信任承諾</p>
    <p class="text-center mb-6 md:mb-10">所有專案皆經由平台把關，<br>致力給贊助會員們最安心的保障！</p>
    <ul class="flex justify-center flex-wrap gap-x-11 md:gap-x-20">
      <li class="w-5/12 lg:w-auto text-brand-1 text-center font-medium text-xl md:text-2xl mb-6" v-for="i in 4" :key="i">
        <div class="flex justify-center items-center bg-gray-4 w-32 h-32 rounded-full mx-auto mb-3 md:mb-4">
          <svg width="52" height="72" viewBox="0 0 52 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M26.0003 5.16662C20.475 5.16662 15.176 7.36156 11.269 11.2686C7.36195 15.1756 5.16701 20.4746 5.16701 26C5.16701 31.5253 7.36195 36.8243 11.269 40.7313C15.176 44.6384 20.475 46.8333 26.0003 46.8333C31.5257 46.8333 36.8247 44.6384 40.7317 40.7313C44.6387 36.8243 46.8337 31.5253 46.8337 26C46.8337 20.4746 44.6387 15.1756 40.7317 11.2686C36.8247 7.36156 31.5257 5.16662 26.0003 5.16662ZM0.167012 26C0.166993 21.7182 1.23124 17.5036 3.26404 13.7352C5.29684 9.96678 8.23443 6.76272 11.8126 4.41119C15.3908 2.05965 19.4974 0.634386 23.7631 0.263571C28.0287 -0.107244 32.3197 0.588022 36.25 2.28684C40.1803 3.98566 43.6267 6.63475 46.2792 9.99587C48.9318 13.357 50.7074 17.3247 51.4462 21.5422C52.185 25.7597 51.8639 30.0948 50.5119 34.1574C49.1598 38.2201 46.8191 41.8829 43.7003 44.8166C43.7887 44.9827 43.858 45.1583 43.907 45.34L46.0737 53.2366C47.0837 56.9266 47.9003 59.8966 48.2703 62.2033C48.6337 64.4633 48.707 66.79 47.4437 68.6833C46.7237 69.76 45.7437 70.6433 44.5903 71.23C42.4903 72.2966 40.2003 71.7733 38.1503 70.9966C36.057 70.21 33.4303 68.84 30.2037 67.1566L30.047 67.0766C27.6337 65.82 27.0037 65.5366 26.397 65.4733C26.1333 65.445 25.8674 65.445 25.6037 65.4733C24.997 65.5366 24.3703 65.82 21.9537 67.0766L21.797 67.1566C18.5703 68.84 15.9437 70.2066 13.8503 70.9966C11.8003 71.7733 9.51034 72.2966 7.41034 71.23C6.25694 70.6393 5.27447 69.7624 4.55701 68.6833C3.29368 66.79 3.36701 64.4633 3.73034 62.2033C4.10034 59.8966 4.91701 56.9266 5.93035 53.2366L8.09368 45.3366C8.143 45.1561 8.21231 44.9817 8.30034 44.8166C5.72899 42.4038 3.68037 39.4888 2.28135 36.2522C0.882321 33.0155 0.162687 29.5261 0.167012 26ZM12.5337 48.05L10.7937 54.4033C9.72701 58.2833 8.99035 60.99 8.66701 62.9966C8.33368 65.08 8.58368 65.7066 8.71701 65.9033C8.95807 66.2721 9.28977 66.5728 9.68034 66.7766C9.75701 66.8133 10.2337 67.02 12.087 66.32C13.8637 65.65 16.2203 64.4233 19.6437 62.6433L19.987 62.4633C21.8803 61.4733 23.4037 60.68 25.0737 60.5C25.6903 60.4333 26.3103 60.4333 26.927 60.5C28.5937 60.6766 30.1203 61.4733 32.0137 62.4633L32.357 62.6433C35.777 64.4233 38.137 65.65 39.9137 66.32C41.767 67.02 42.247 66.8133 42.3203 66.7766C42.7121 66.5731 43.0449 66.2724 43.287 65.9033C43.4203 65.7033 43.667 65.08 43.3337 62.9966C43.0103 60.99 42.2703 58.2833 41.2103 54.4033L39.467 48.05C35.414 50.5313 30.7526 51.8408 26.0003 51.8333C21.2481 51.8408 16.5867 50.5313 12.5337 48.05ZM26.0003 19.45C25.807 19.7833 25.5903 20.17 25.337 20.6266L25.0103 21.2133L24.9337 21.3466C24.6737 21.8266 24.2403 22.62 23.517 23.17C22.7803 23.73 21.8903 23.9233 21.3737 24.0366L21.227 24.0666L20.5937 24.21C20.007 24.3433 19.5303 24.45 19.127 24.5533C19.3903 24.8766 19.7337 25.2833 20.1803 25.8066L20.6137 26.3133L20.7137 26.4266C21.0737 26.8433 21.6537 27.51 21.9237 28.3766C22.1903 29.23 22.097 30.11 22.0403 30.6633C22.0345 30.7155 22.0289 30.7677 22.0237 30.82L21.957 31.4966C21.907 32.0074 21.8604 32.5186 21.817 33.03C22.167 32.8766 22.5603 32.6966 23.0303 32.48L23.627 32.2066L23.7603 32.14C24.2403 31.9166 25.0703 31.5266 26.0003 31.5266C26.9303 31.5266 27.7603 31.9166 28.2403 32.1433L28.3737 32.2066L28.9703 32.48C29.437 32.6966 29.837 32.88 30.1837 33.03C30.1403 32.5186 30.0936 32.0074 30.0437 31.4966L29.977 30.82C29.9718 30.7677 29.9662 30.7155 29.9603 30.6633C29.9037 30.1066 29.8103 29.23 30.077 28.3766C30.3437 27.51 30.927 26.8433 31.287 26.4266L31.387 26.3133L31.8203 25.8066C32.267 25.2833 32.6103 24.8766 32.8737 24.5533C32.4703 24.4533 31.9937 24.3433 31.407 24.21L30.7737 24.0666L30.627 24.0333C30.1103 23.9233 29.2203 23.73 28.4837 23.1666C27.7603 22.62 27.327 21.8266 27.067 21.35L26.9903 21.2133L26.6637 20.6266C26.4103 20.17 26.197 19.7866 26.0003 19.45ZM22.7137 15.3333C23.287 14.5833 24.327 13.5 26.0003 13.5C27.6737 13.5 28.7137 14.5833 29.287 15.3333C29.837 16.0466 30.387 17.0366 30.9537 18.0533L31.0303 18.19L31.357 18.78L31.547 19.1133L31.877 19.19L32.5103 19.3333L32.6703 19.3666C33.7603 19.6166 34.847 19.86 35.6803 20.19C36.6003 20.5533 37.847 21.2566 38.3303 22.8066C38.8037 24.3233 38.207 25.61 37.687 26.44C37.2037 27.2066 36.4703 28.06 35.7203 28.9366L35.6203 29.0533L35.187 29.5633L34.9137 29.8866C34.9203 30.0066 34.937 30.1466 34.9537 30.3366L35.0203 31.0133L35.0337 31.1666C35.147 32.34 35.257 33.4733 35.217 34.38C35.177 35.3333 34.9503 36.7733 33.657 37.75C32.3237 38.7633 30.857 38.5433 29.9237 38.2733C29.0637 38.03 28.047 37.56 27.0237 37.09L26.8803 37.0233L26.2803 36.7466L26.0003 36.6166L25.717 36.75L25.1203 37.0233L24.9737 37.09C23.9537 37.56 22.937 38.03 22.077 38.2733C21.1437 38.54 19.677 38.7633 18.3437 37.75C17.0537 36.7733 16.8237 35.3333 16.7837 34.3833C16.7437 33.4733 16.8503 32.34 16.967 31.1666L16.9803 31.0133L17.047 30.3366L17.0903 29.8866C16.9988 29.7783 16.9066 29.6705 16.8137 29.5633L16.3803 29.0533L16.2803 28.9366C15.5303 28.06 14.797 27.2033 14.3137 26.4366C13.7937 25.61 13.197 24.3233 13.6703 22.8033C14.1503 21.26 15.4003 20.5533 16.3203 20.19C17.1537 19.86 18.2403 19.6166 19.3303 19.37L19.487 19.3366L20.1237 19.19L20.457 19.1133L20.6437 18.78L20.9703 18.19L21.047 18.0533C21.6137 17.0366 22.1637 16.0466 22.7137 15.3333Z" fill="#1F2225"/>
          </svg>
        </div>
        平台徽章認證
      </li>
    </ul>
  </div>
  <div class="container m-auto gap-10 flex justify-between items-start">
    <MemberMenu active="sponsor" />
    <div class="w-full">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium recusandae voluptas aliquam quisquam esse corrupti fugit sint consequuntur voluptates fuga reprehenderit error, totam quam voluptatibus nemo illum veniam. Dignissimos fugiat numquam consequuntur soluta impedit dolorem placeat exercitationem a ipsam, iste possimus cumque, quod, repellendus itaque libero corporis sapiente vel voluptate eos quam. Deleniti magnam, vitae dolor voluptate ad, ducimus veniam voluptatum necessitatibus labore quasi officia natus quo quas eius architecto inventore quibusdam illum est amet aliquid laudantium incidunt. Perspiciatis nihil voluptatem quae, cupiditate blanditiis placeat commodi tempore eaque illo laboriosam illum, non porro ut iure hic, quia velit similique exercitationem nam quasi veniam sapiente! Consectetur accusantium quo ipsum neque tenetur laboriosam magni ut saepe praesentium nihil! Aliquid quidem debitis enim, maxime ex quis voluptatem molestias temporibus nesciunt molestiae, dignissimos itaque quos modi sint rerum, at libero dolore illum ipsum totam qui? Autem qui maiores labore rerum veritatis natus eaque, magni dolorem optio architecto eveniet sapiente, magnam dolorum molestiae? Cum aliquid voluptatem fugiat suscipit officia minus rerum, soluta exercitationem quae, blanditiis enim accusantium maiores nihil! Vitae magnam repellat alias explicabo impedit eum nobis aliquid nulla, esse tempora minus atque. Dignissimos provident ducimus mollitia nihil doloremque alias quasi. Dolores, debitis. Eveniet, quo itaque. Deleniti saepe assumenda ea dolor, adipisci cupiditate provident beatae exercitationem error molestias expedita vero sapiente voluptates reiciendis quod voluptatum sequi ex accusamus veniam id! Sit quas sunt veritatis deleniti asperiores eius, maxime cupiditate ullam nemo voluptatum voluptates eveniet ratione? Alias reiciendis laudantium repellat dolorem dolorum quia. Sapiente maiores consequatur quibusdam perspiciatis quis nihil aliquid dolorum beatae explicabo culpa consectetur nobis, inventore esse reprehenderit. Aliquam repudiandae voluptate a soluta, unde inventore blanditiis, laudantium, possimus quasi vel esse perferendis? Nesciunt placeat quisquam exercitationem. Nobis incidunt enim itaque in at ipsa earum iste nostrum, quod corporis consequatur natus iusto distinctio porro dolorem! Natus quam, culpa enim soluta quibusdam possimus impedit unde dolores optio perferendis iure explicabo accusamus, similique vero illum quae veniam tenetur, corrupti sunt quisquam. Ratione doloremque porro dolorum eveniet eum assumenda dolore in, ab, delectus praesentium mollitia possimus, laudantium sit illum soluta aliquam! Voluptate, mollitia quisquam unde laudantium accusamus nesciunt. Culpa ratione dolorum debitis ipsa! Quo, illo beatae perspiciatis tempore officiis repellat incidunt cum veritatis praesentium neque fugit saepe consectetur exercitationem velit eius culpa reiciendis nemo temporibus, obcaecati et magnam similique. Facilis ipsam ea nulla dicta at in amet quidem, est tempora, corporis voluptatibus aliquam eligendi consequuntur sint! Rerum facilis et quaerat excepturi animi, natus placeat sequi nostrum non quisquam! Ipsa explicabo voluptatem voluptas provident distinctio culpa quibusdam ratione, commodi odio. Adipisci nostrum doloribus omnis assumenda! Consequuntur corrupti labore quisquam dicta libero laudantium ea illo repellat culpa voluptate ut, dignissimos ex laborum maxime deleniti repellendus quibusdam quae, eligendi exercitationem excepturi adipisci ab aliquid cum fugiat! Quisquam quo, autem voluptatibus officiis aperiam tempora distinctio error cupiditate delectus eius rem harum ex iure nulla dolorem? Voluptate, nostrum dolorem deleniti molestias aliquid ratione officiis voluptates laborum maiores commodi dolor odio ipsum tempore atque ipsam repellendus laboriosam itaque minima praesentium ullam doloremque magni inventore.
    </div>
  </div>
  <div class="container mx-auto">
    <PlanList
      :data="[{}, {}, {}, {}]"
    />
    <ProgressBar :percent="75" />
    <ShareButton />
  </div>
</template>

<style>
body {
  background-image: url('/homeBackground.png');
  background-repeat: no-repeat;
  background-position: -100px -100px;
}

.bg-categories {
  background-image: url('/bg-categories.png');
  background-repeat: no-repeat;
  background-position: 100%;
}

</style>