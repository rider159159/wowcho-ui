<script setup lang="ts">
import { useForm } from 'vee-validate'
import { login } from '@/interface'

const schema = computed(() => ({
  email: 'required|email',
  password: 'password',
  confirmPassword: 'confirmed:@password'
}))

const { errors, useFieldModel, resetForm, handleSubmit, meta } = useForm({
  validationSchema: schema,
  initialValues: login
})
const [email, password, confirmPassword] = useFieldModel(['email', 'password', 'confirmPassword'])

const onSubmit = handleSubmit(values => {
  console.log('submit', values, meta)
})
const submitStatus = ref(false)

function submitHandler () {
  submitStatus.value = true
  onSubmit()
}

function resetHandler () {
  submitStatus.value = false
  resetForm()
}
</script>

<template>
  <section class="flex flex-col gap-4">
    <div class="flex flex-col">
      <label for="email" class="flex">
        <p>email:</p>
        <input v-model="email" class="border border-gray" name="email" />
      </label>
      <span v-if="email || submitStatus" class="text-red-500" >{{ errors.email }}</span>
    </div>
    <div>
      <label for="password" class="flex">
        <p>password:</p>
        <input v-model="password" class="border border-gray" name="password" />
      </label>
      <span v-if="password || submitStatus" class="text-red-500">{{ errors.password }}</span>
    </div>
    <div>
      <label for="confirmPassword" class="flex">
        <p>確認密碼:</p>
        <input v-model="confirmPassword" type="password" class="border border-gray" name="confirmPassword" />
      </label>
      <span v-if="confirmPassword || submitStatus" class="text-red-500">{{ errors.confirmPassword }}</span>
    </div>
    <button @click="submitHandler" class="w-120px">送出表單</button>
    <button @click="resetHandler" class="w-120px">重製表單</button>
  </section>
</template>
