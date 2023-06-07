<script setup lang="ts">
import { fetchProposal, fetchMember } from '@/api'
import { dateYYYYMMDD } from '@/composables'
import { BusinessProfile } from '@/interface'
const route = useRoute()
const businessProfile = ref({ ...BusinessProfile })

// 獲得商業檔案資料
async function getBusinessProfile () {
  const query = { id: route.params.userId }
  const res = await fetchMember.getBusinessProfile(query)
  if (res.status !== 'Success') return
  businessProfile.value = res.data
}

const data:any = ref({
list: [],
totalCount: 0
})

const formQuery = ref({
  page: 1,
  id: route.params.userId,
  pageSize: 10,
})

// 獲得該使用者募資活動
async function getUserProposal() {
  const res = await fetchProposal.getUserProposal(formQuery.value)
  if (res.status !== 'Success') return
  data.value = res.data
}

watch(
  () => formQuery.value.page,
  () => getUserProposal()
)

onMounted(() => {
  getUserProposal()
  getBusinessProfile()
})
</script>

<template>
  <section>
    <!-- <p>{{ route.params.userId }}</p>  -->
    <div class="flex flex-col md:flex-row md:justify-center b-b b-gray3 mb-6">
      <img :src="businessProfile.businessImage" class="w-32 h-32">
      <div>
        <p class="text-brand-1 font-medium text-xl mb-6">{{ businessProfile.businessName }}</p>
        <div v-html="businessProfile.businessIntro" class="text-sm text-gray-2 mb-6"></div>

        <ul class="flex  items-center gap-5 mb-5">
          <li v-if="businessProfile.facebook">
            <a :href="businessProfile.facebook"  class="block border border-brand-3 rounded-full p-1.5" title="另開新分頁：Facebook" target="_blank">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z" fill="#369CF0"/>
              </svg>
            </a>
          </li>
          <li  v-if="businessProfile.instagram">
            <a class="block border border-brand-3 rounded-full p-1.5" href="#" title="另開新分頁：Instagram" target="_blank">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C14.717 2 15.056 2.01 16.122 2.06C17.187 2.11 17.912 2.277 18.55 2.525C19.21 2.779 19.766 3.123 20.322 3.678C20.8305 4.1779 21.224 4.78259 21.475 5.45C21.722 6.087 21.89 6.813 21.94 7.878C21.987 8.944 22 9.283 22 12C22 14.717 21.99 15.056 21.94 16.122C21.89 17.187 21.722 17.912 21.475 18.55C21.2247 19.2178 20.8311 19.8226 20.322 20.322C19.822 20.8303 19.2173 21.2238 18.55 21.475C17.913 21.722 17.187 21.89 16.122 21.94C15.056 21.987 14.717 22 12 22C9.283 22 8.944 21.99 7.878 21.94C6.813 21.89 6.088 21.722 5.45 21.475C4.78233 21.2245 4.17753 20.8309 3.678 20.322C3.16941 19.8222 2.77593 19.2175 2.525 18.55C2.277 17.913 2.11 17.187 2.06 16.122C2.013 15.056 2 14.717 2 12C2 9.283 2.01 8.944 2.06 7.878C2.11 6.812 2.277 6.088 2.525 5.45C2.77524 4.78218 3.1688 4.17732 3.678 3.678C4.17767 3.16923 4.78243 2.77573 5.45 2.525C6.088 2.277 6.812 2.11 7.878 2.06C8.944 2.013 9.283 2 12 2ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7ZM18.5 6.75C18.5 6.41848 18.3683 6.10054 18.1339 5.86612C17.8995 5.6317 17.5815 5.5 17.25 5.5C16.9185 5.5 16.6005 5.6317 16.3661 5.86612C16.1317 6.10054 16 6.41848 16 6.75C16 7.08152 16.1317 7.39946 16.3661 7.63388C16.6005 7.8683 16.9185 8 17.25 8C17.5815 8 17.8995 7.8683 18.1339 7.63388C18.3683 7.39946 18.5 7.08152 18.5 6.75ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9Z" fill="#369CF0"/>
              </svg>
            </a>
          </li>
          <li v-if="businessProfile.website">
            <a :href="businessProfile.website"  class=" cursor-pointer block border border-brand-3 rounded-full p-1.5" title="另開新分頁：網站" target="_blank">
              <span class="mdi mdi-web flex justify-center items-center w-24px h-24px text-xl text-#369CF0"></span>
            </a>
          </li>
        </ul>

      </div>
    </div>
    <RouterLink v-for="item in data.list" :to="`/proposal/${item.customizedUrl}`" :key="item.id" class="block mb-4 last:mb-0" >
      <div class="grid grid-cols-10 gap-6 w-full cursor-pointer ease-in duration-300 hover:-translate-y-4">
        <div class="col-span-3">
          <img :src="item.image" alt="">
        </div>
        <div class="col-span-7">
          <p class="text-brand-2 font-medium text-base mb-2">{{ item.name }}</p>
          <p class="text-sm"> {{ dateYYYYMMDD(item.endTime) }}</p>
        </div>
      </div>
    </RouterLink>
      <!-- 分頁 -->
      <Pagination
        v-model="formQuery.page"
        v-if="data.totalCount > 0"
        class="mb-10"
        :page-size="formQuery.pageSize"
        :total="data.totalCount"
      />
  </section>
</template>