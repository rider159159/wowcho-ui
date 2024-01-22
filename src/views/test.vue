<script setup lang="ts">
import axios, { AxiosResponse } from 'axios'

interface memberItem {
    id: number,
    name: string,
    age: number,
}

interface memberData {
    data:memberItem[]|memberItem
}

interface apiModule<T> {
  data:T,
  status:number
  is_success:boolean,
}

interface memberDataRes extends apiModule<memberData>{}

async function getData() :Promise<memberDataRes> {
  const res: AxiosResponse<memberDataRes> = await axios.get('http://192.168.1.242/manage/engineer/programask/ask.aspx?id=49227')
  return res.data
}

const member = ref<memberData>({
  data: {
    id: 0,
    name: '',
    age: 0
  }
})
onMounted(async() => {
  const result = await getData()
  member.value = result.data
})
</script>

<template>
  <section>
    <div v-if="Array.isArray(member.data)">
    </div>
    <div v-else>
      <div v-if="Array.isArray(member.data)">
        {{ member.data.name }}
      </div>
    </div>
  </section>
</template>
