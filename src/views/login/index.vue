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
  <section class="flex flex-col gap-4 justify-center items-center mx-4 md:mx-8">
    <div class="flex flex-col">
      <label for="email" class="flex flex-col">
        <p class="mb-2">電子信箱</p>
        <input v-model="email" type="email" id="email" name="email" class="w-full px-2 mb-2 rounded b border-[#ccc] focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600" />
      </label>
      <span v-if="email || submitStatus" class="text-red-500" >{{ errors.email }}</span>
    </div>
    <div>
      <label for="password" class="flex flex-col">
        <p class="mb-2">密碼:</p>
        <input v-model="password" type="password" name="password" class="w-full px-2 mb-2 rounded b border-[#ccc] focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600" />
      </label>
      <span v-if="password || submitStatus" class="text-red-500">{{ errors.password }}</span>
    </div>
    <h5>請選擇你要登入的角色</h5>
    <div >
      <div class="flex">
        <label for="sponsor" class="flex mr-4">
          <p class="mr-2">贊助者</p>
          <input v-model="role" :value="1" type="radio" name="role" id="sponsor">
        </label>
        <label for="proposer" class="flex mr-4">
          <p class="mr-2">提案者</p>
          <input v-model="role" :value="2" type="radio" name="role" id="proposer">
        </label>
      </div>
      <span v-if="role || submitStatus" class="text-red-500">{{ errors.role }}</span>
    </div>

    <button @click="submitHandler" type="button" class="w-120px">登入</button>
    <!-- <Dropdown v-model="role" :item-list="array" name="role"></Dropdown> -->
  </section>
</template>
