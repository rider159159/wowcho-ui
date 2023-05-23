// TODO: 路由守衛
import { Router } from 'vue-router'
import { GET_TOKEN } from '@/utils'
import { fetchMember } from '@/api'
import { userInfoStore } from '@/stores'
import Swal from 'sweetalert2'

const permission = (router:Router) => {
  router.beforeEach(async (to) => {
    const USER_TOKEN = GET_TOKEN()
    const USER_STORE = userInfoStore()

    // 前往頁面有權限
    if (to.meta.requiresAuth) {
      // 驗證 Token 若無則回到登入頁面
      if (!USER_TOKEN) {
        Swal.fire({
          title: '你尚未登入!',
          icon: 'warning'
        })
        return '/login'
      }
      const res = await fetchMember.getProfile()
      // 若有錯誤回登入頁，並清除資料、登出
      if (res.status !== 'Success') {
        USER_STORE.FN_LOGOUT()
        return '/login'
      }
      // 儲存使用者資料
      USER_STORE.USER_INFO_REF = res.data
      // 驗證通過
      return true
    }
  })
}

export default permission
