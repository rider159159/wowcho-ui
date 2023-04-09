import { defineStore } from 'pinia'
import { UserInfo } from '@/interface'

export const userInfoStore = defineStore('user-info-store', () => {
  // 也可以使用 any   const USER_INFO_REF: any = ref({})
  const USER_INFO_REF = ref<UserInfo>({
    id: 0,
    name:'',
    nickName: '',
    photo:'',
    email: ''
  })
  
  return {
    USER_INFO_REF
  }
})
