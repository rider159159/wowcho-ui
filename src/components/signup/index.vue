<script setup lang="ts">
import { fetchMember } from '@/api'
import { Swal } from '@/plugins/sweet-alert'

async function submitForm(value:any) {
  const formBody = value
  const response = await fetchMember.register(formBody)
  if (response.status !== 'Success') return
  Swal.fire({
    icon: 'success',
    text: '註冊成功，請登入帳號',
    confirmButtonText: '確定',
    confirmButtonColor: '#2378BF',
    timer: 3000
  })
  emits('switchToLogin')
  // router.push({ name: 'login' })
}

const passwordShow = ref(true)
const passwordType = ref('password')

function togglePasswordType(show:boolean, type:string) {
  passwordShow.value = show
  passwordType.value = type
}

const emits = defineEmits(['switchToLogin'])
</script>

<template>
  <section class="flex justify-center w-full px-4 pb-12">
    <VForm @submit="submitForm" v-slot="{ errors }"  class="w-full md:w-75% xl:w-50% flex flex-col gap-4">
      <img src="/footer_logo.svg" alt="">
      <div class="text-h3 text-center my-10px">
        <span class="mdi mdi-account-plus text-h3 text-brand6"></span>
        註冊
      </div>
      <div class="text-14px">
        已經有帳號了嗎?
        <button type="button" @click="emits('switchToLogin')" class="text-brand2 bg-white">登入</button>
      </div>
      <div>
        <label for="account" class="flex flex-col">
          <p class="mb-2 text-lg">帳號</p>
          <VField type="text" name="account" label="帳號" rules="required" id="account"
            placeholder="請輸入帳號"
            class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3" 
            :class="{'!border-#FF5D71':errors.account}"
          />
        </label>
        <span v-if="errors.account" class="block text-#FF5D71 text-14px">{{ errors.account }}</span>
      </div>
      <div>
        <label for="username" class="flex flex-col">
          <p class="mb-2 text-lg">用戶名稱</p>
          <VField type="text" name="username" label="會員名稱" rules="required" id="username"
            placeholder="請輸入會員名稱"
            class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3" 
            :class="{'!border-#FF5D71':errors.username}"
          />
        </label>
        <span v-if="errors.name" class="block text-#FF5D71 text-14px">{{ errors.username }}</span>
      </div>
      <div>
        <label for="email" class="flex flex-col">
          <p class="mb-2 h6">電子信箱</p>
          <VField type="email" name="email" label="電子信箱" rules="required|email" id="email"
            placeholder="請輸入電子信箱"
            class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3" 
            :class="{'!border-#FF5D71':errors.email}"
          />
        </label>
        <span v-if="errors.email" class="block text-#FF5D71 text-14px">{{ errors.email }}</span>
      </div>
      <div>
        <label for="password" class="flex flex-col">
          <p class="mb-2">密碼</p>
          <VField name="password" label="密碼" rules="required|password" v-slot="{ field }">
            <div class="relative">
              <input v-bind="field" :type="passwordType" placeholder="請輸入密碼"
                class="w-full h-48px text-h6 leading-h4 px-2 rounded-8px b-2px border-line focus:outline-none focus:border-brand3"
                :class="{'!border-#FF5D71':errors.password}">
              <span v-if="passwordShow" @click="togglePasswordType(false,'text')" class="mdi mdi-eye text-h4 absolute top-3 right-4 cursor-pointer"></span>
              <span v-if="!passwordShow" @click="togglePasswordType(true,'password')" class="mdi mdi-eye-off text-h4 absolute top-3 right-4 cursor-pointer"></span>
            </div>
          </VField>
        </label>
        <span v-if="errors.password" class="block text-#FF5D71 text-14px">{{ errors.password }}</span>
      </div>
      <button type="submit" @keyup.enter="submitForm" class="mt-4 w-full py-2 py-2 bg-brand-1 hover:bg-brand-2 duration-300 text-white rounded-3xl">註冊</button>
    </VForm>
  </section>
</template>
