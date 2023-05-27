// TODO: 路由守衛
import { Router } from 'vue-router'
import { GET_TOKEN } from '@/utils'
import { fetchMember } from '@/api'
import { userInfoStore } from '@/stores'
// import Swal from 'sweetalert2'

const permission = (router:Router) => {
  router.beforeEach(async (to) => {
    const USER_TOKEN = GET_TOKEN()
    const USER_STORE = userInfoStore()
    // 有 token 時
    if (USER_TOKEN) {
      // 進入有權限頁面
      if (to.meta.requiresAuth) {
        const res = await fetchMember.getProfile()
        // 若有錯誤回登入頁，並清除資料、登出
        if (res.status !== 'Success') {
          USER_STORE.FN_LOGOUT()
          return '/login'
        }
        // 儲存使用者資料
        USER_STORE.USER_INFO_REF = res.data
        return true
      } else { // 進入非有權限頁面
        const res = await fetchMember.getProfile()
        if (res.status === 'Success') { // 非有權限頁面時，獲得使用者資料需成功才塞 Token
          USER_STORE.USER_INFO_REF = res.data
        }
      }
    } else { // 無 token
      // 進入有權限頁面
      if (to.meta.requiresAuth) {
        USER_STORE.USER_LOGIN_ROUTE_REF = to.fullPath
        return '/login'
      }
    }
    // 前往頁面有權限
    // if (to.meta.requiresAuth) {
    //   const res = await fetchMember.getProfile()
    //   // 驗證 Token 若無則回到登入頁面
    //   if (!USER_TOKEN) {
    //     Swal.fire({
    //       title: '你尚未登入!',
    //       icon: 'warning'
    //     })
    //     return '/login'
    //   }
    //   // 若有錯誤回登入頁，並清除資料、登出
    //   if (res.status !== 'Success') {
    //     USER_STORE.FN_LOGOUT()
    //     return '/login'
    //   }
    //   // 驗證通過
    //   USER_STORE.USER_INFO_REF = res.data
    //   return true
    // }
  })

  // 滑到頁頂
  router.afterEach((to, from, next) => {
    window.scrollTo(0, 0)
  })
}

export default permission
