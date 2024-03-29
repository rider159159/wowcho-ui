<script setup lang="ts">
import { dateYYYYMMDD } from '@/composables'
import { fetchSponsor } from '@/api'
import { SponsorList } from '@/interface'

const router = useRouter()
const route = useRoute()

const data = ref({
  list: { ...SponsorList },
  totalCount: 0
})
function goDetail(id: string) {
  router.push({
    name: 'sponsorDetail',
    params: { id }
  })
}
const formQuery = ref({
  page: 1,
  pageSize: 10,
  customizedUrl: route.params.proposal
})

async function getSponsorList () {
  const res = await fetchSponsor.getList(formQuery.value)
  if (res.status !== 'Success') return
  data.value = res.data
}

watch(
  () => formQuery.value.page,
  () => getSponsorList()
)

onMounted(() => {
  getSponsorList()
})
</script>

<template>
  <div class="md:(max-w-324 mx-auto) flex flex-col justify-center py-12 md:py-20">
    <div class="text-h2 leading-h2 mb-4">贊助列表</div>
    <p class=" mb-56px">可點擊想要查看的贊助項目，即會進入該贊助項目的贊助詳情頁。</p>
    <div class="w-full overflow-x-auto rounded-t-2 mb-8">
      <table class="min-w-324">
        <thead class="h-50px bg-gray-4 rounded-lg text-gray-2 font-medium">
          <!-- <th class="rounded-l-lg">訂單編號</th> -->
          <th>購買日期</th>
          <th>贊助專案</th>
          <th>贊助方案</th>
          <th>提案人名稱</th>
          <th>提案人 Email</th>
          <!-- <th>詳細</th> -->
          <th class="text-right rounded-r-lg">金額</th>
        </thead>
        <tbody>
          <tr v-for="sponsor in data.list" :key="sponsor.id" class="cursor-pointer text-gray-1 rounded-l-lg transition-all transition-duraiotn-500 hover:bg-brand-4 text-center" @click="goDetail(sponsor.id)">
            <!-- <td>{{ sponsor.MerchantOrderNo }}</td> -->
            <td>{{ dateYYYYMMDD(sponsor.updatedAt) }}</td>
            <td class="text-left">{{ sponsor.proposalId.name }}</td>
            <td class="text-left">{{ sponsor.planId.name }}</td>
            <td class="text-left">{{ sponsor.ownerId.businessName }}</td>
            <td>{{ sponsor.ownerId.businessEmail }}</td>
            <!-- <td class="text-brand-2 hover:text-brand-1 transition transition-all transition-duration-500 rounded-r-lg" @click="goDetail(sponsor.id)">
              <div class="flex justify-center items-center">
                <div>詳情</div>
                <div class="mdi mdi-chevron-right w-6 h-6"></div>
              </div>
            </td> -->
            <td class="text-right">{{ sponsor.planId.actualPrice?.toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <MyPagination
      v-if="data.totalCount > 0"
      v-model="formQuery.page"
      :page-size="formQuery.pageSize"
      :total="data.totalCount"
      class="mb-10"
    />
  </div>
</template>

<style lang="scss" scoped>
table {
  th, td {
    @apply p-4 min-w-25;
  }
  th {
    @apply h-50px;
  }
  tr {
    &:not(:first-child) {
      @apply border-t-1 border-line;
    }
  }
  td {
    @apply h-14;
  }
}
</style>
