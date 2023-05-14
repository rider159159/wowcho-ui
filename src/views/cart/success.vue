<script setup lang="ts">
// import { ref, onMounted, toRaw } from 'vue'
// import axios from 'axios'

// const backendDomain = import.meta.env.VITE_APP_BACKEND_DOMAIN
// const dataInfo = ref({})
// const result = ref({})

// onMounted(async () => {
//   try {
//     const response = await axios.get(`${backendDomain}/money-flow/newebpay-return`)
//     dataInfo.value = response.data
//     console.log('dataInfo', toRaw(dataInfo.value))

//     const resData = toRaw(dataInfo.value)
//     result.value = resData.mpgReturnData?.Result || {}
//     console.log(toRaw(result.value))
//     console.log(toRaw(dataInfo.value?.title))
//   } catch (error) {
//     console.error('Error fetching data:', error)
//   }
// })
</script>

<template>
  <div>
    <div>
    購買成功
    </div>
    <!-- <table>
      <thead>
        <tr>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, key) in result" :key="key">
          <td>{{ key }}</td>
          <td>{{ value }}</td>
        </tr>
      </tbody>
    </table> -->
  </div>
</template>
