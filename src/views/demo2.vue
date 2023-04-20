<script setup lang="ts">
// import { useForm } from 'vee-validate'
// import { login } from '@/interface'

// const schema = computed(() => ({
//   account: 'required|email',
//   password: 'password'
// }))

// const { errors, useFieldModel, resetForm, handleSubmit, meta } = useForm({
//   validationSchema: schema,
//   initialValues: login
// })
// const [account, password] = useFieldModel(['account', 'password'])

// const onSubmit = handleSubmit(values => {
//   console.log('submit', values, meta)
// })
// const submitStatus = ref(false)

// function submitHandler () {
//   submitStatus.value = true
//   onSubmit()
// }

// function resetHandler () {
//   submitStatus.value = false
//   resetForm()
// }
function submitForm(value:any) {
  console.log(value)
}
</script>

<template>
  <div>
    <!-- <section class="flex flex-col gap-4 border-b-2 b-pink">
      <div class="flex flex-col">
        <label for="email" class="flex">
          <p>email:</p>
          <input v-model="account" class="border border-gray" label="帳號" name="email" />
        </label>
        <span v-if="account || submitStatus" class="text-red-500" >{{ errors.account }}</span>
      </div>
      <div>
        <label for="password" class="flex">
          <p>password:</p>
          <input v-model="password" class="border border-gray" name="password" />
        </label>
        <span v-if="password || submitStatus" class="text-red-500">{{ errors.password }}</span>
      </div>
      <button @click="submitHandler" class="w-120px">送出表單</button>
      <button @click="resetHandler" class="w-120px">重製表單</button>
    </section> -->
    <section>
    <VForm  @submit="submitForm">
      <VField
        name="email"
        type="email"
        label="信箱"
        rules="required"
        class="bg-pink"
      />
      <ErrorMessage name="email"/>

      <VField
        name="name"
        label="姓名"
        type="text"
        rules="required"
      />
      <ErrorMessage name="name"/>
      <button type="submit" >送出表單</button>
    </VForm>
    </section>
  </div>

</template>
