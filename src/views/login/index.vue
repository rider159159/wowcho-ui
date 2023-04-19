<script setup lang="ts">
import { useForm } from 'vee-validate'
import { login } from '@/interface'
import { fetchLogin } from '@/api'
import { SET_TOKEN } from '@/utils'
import axios from 'axios'

const env = import.meta.env.MODE
const router = useRouter()
const schema = computed(() => ({
  email: 'required|email',
  password: 'password',
  role: 'required'
}))

const { errors, useFieldModel, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: login
})
const [role, email, password] = useFieldModel(['role', 'email', 'password'])

const onSubmit = handleSubmit(async (values) => {
  if (role.value === 1) {
    const { data } = await fetchLogin.login(values)
    SET_TOKEN('wowcho', data.token)
    router.push({ name: 'home' })
  } else if (role.value === 2) {
    axios.post('http://localhost:3034/api/login', values)
      .then((res) => {
        console.log(res.data)
        const { data } = res.data
        SET_TOKEN('wowchoAdmin', data.token)
        if (env === 'development') {
          location.replace('http://localhost:1804')
        }
      })
      .catch((error) => { console.error(error) })
  }
})

const submitStatus = ref(false)

function submitHandler () {
  submitStatus.value = true
  onSubmit()
}
</script>

<template>
  <section class="flex justify-center w-full px-4">
    <div class="w-full md:w-75% xl:w-50% flex flex-col gap-4">
      <div>
        <label for="email" class="flex flex-col">
          <p class="mb-2 h6">電子信箱</p>
          <input v-model="email" type="email" id="email" name="email" class="w-full text-h6 leading-h4 px-2 mb-2 rounded b border-[#ccc] focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600" />
        </label>
        <span v-if="email || submitStatus" class="block text-red-500" >{{ errors.email }}</span>
      </div>
      <div>
        <label for="password" class="flex flex-col">
          <p class="mb-2">密碼:</p>
          <input v-model="password" type="password" name="password" class="w-full text-h6 leading-h4 px-2 mb-2 rounded b border-[#ccc] focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600" />
        </label>
        <span v-if="password || submitStatus" class="block text-red-500">{{ errors.password }}</span>
      </div>
      <div>
        <h5 class="mb-2">請選擇你要登入的角色</h5>
        <div class="flex">
          <label for="sponsor" class="flex mr-4">
            <p class="mr-2 cursor-pointer">贊助者</p>
            <input v-model="role" :value="1" type="radio" name="role" id="sponsor">
          </label>
          <label for="proposer" class="flex mr-4">
            <p class="mr-2 cursor-pointer">提案者</p>
            <input v-model="role" :value="2" type="radio" name="role" id="proposer">
          </label>
        </div>
        <span v-if="role || submitStatus" class="block text-red-500">{{ errors.role }}</span>
      </div>
      <button @click="submitHandler" type="button" class="w-full py-2 bg-brand-1 rounded-3xl">登入</button>
    </div>
  </section>
</template>
