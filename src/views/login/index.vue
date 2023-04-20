<script setup lang="ts">
import { fetchMember } from '@/api'
import { SET_TOKEN } from '@/utils'
import axios from 'axios'

const env = import.meta.env.MODE
const router = useRouter()

async function submitForm(value:any) {
  const formBody = value
  if (formBody.role === 'sponsor') {
    const { data } = await fetchMember.login(formBody)
    SET_TOKEN('wowcho', data.token)
    router.push({ name: 'home' })
  } else if (formBody.role === 'proposer') {
    axios.post('http://localhost:3034/api/login', formBody)
      .then((res) => {
        const { data } = res.data
        SET_TOKEN('wowchoAdmin', data.token)
        if (env === 'development') {
          location.replace('http://localhost:1804')
        }
      })
      .catch((error) => { console.error(error) })
  }
}

const passwordShow = ref(true)
const passwordType = ref('password')
function togglePasswordType(show:boolean, type:string) {
  passwordShow.value = show
  passwordType.value = type
}
</script>

<template>
  <section class="flex justify-center w-full px-4">
    <VForm class="w-full md:w-75% xl:w-50% flex flex-col gap-4" @submit="submitForm">
      <div>
        <label for="account" class="flex flex-col">
          <p class="mb-2 h6">帳號</p>
          <VField type="text" name="account" label="帳號" rules="required" class="text-h6 leading-h4 px-2 mb-2 rounded b border-[#ccc] focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600" />
        </label>
        <ErrorMessage name="account" class="block text-red-500"/>
      </div>
      <div>
        <label for="password" class="flex flex-col">
          <p class="mb-2">密碼:</p>
          <VField name="password" label="密碼" rules="required" v-slot="{ field }">
            <div class="relative">
              <input v-bind="field" :type="passwordType" class="w-full text-h6 leading-h4 px-2 mb-2 rounded b border-[#ccc] focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600">
              <span v-if="passwordShow" @click="togglePasswordType(false,'text')" class="mdi mdi-eye text-h4 absolute right-4"></span>
              <span v-if="!passwordShow" @click="togglePasswordType(true,'password')" class="mdi mdi-eye-off text-h4 absolute right-4"></span>
            </div>
          </VField>
        </label>
        <ErrorMessage name="password" class="block text-red-500"/>
      </div>
      <div>
        <h5 class="mb-2">請選擇你要登入的角色</h5>
        <div class="flex">
          <label for="sponsor" class="flex mr-4">
            <p class="mr-2 cursor-pointer">贊助者</p>
            <VField value="sponsor" rules="required" name="role" label="角色" type="radio" id="sponsor" />
          </label>
          <label for="proposer" class="flex mr-4">
            <p class="mr-2 cursor-pointer">提案者</p>
            <VField :value="'proposer'" rules="required" name="role" label="角色" type="radio" id="proposer"/>
          </label>
        </div>
        <ErrorMessage name="role" class="block text-red-500"/>
      </div>
      <button type="submit" class="mt-4 w-full py-2 bg-brand-1 text-white rounded-3xl">登入</button>
    </VForm>
  </section>
</template>
