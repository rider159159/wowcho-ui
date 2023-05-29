// TODO: 路由守衛
import { Router } from 'vue-router'
import { GET_TOKEN } from '@/utils'
import { fetchMember } from '@/api'
import { userInfoStore, userLoginStore, searchStore } from '@/stores'
// import Swal from 'sweetalert2'
const permission = (router:Router) => {
  router.beforeEach(async (to, from) => {
    const USER_TOKEN = GET_TOKEN()
    // console.log('USER_TOKEN:', USER_TOKEN)

    const USER_STORE = userInfoStore()
    const LOGIN_STORE = userLoginStore()

    if (USER_TOKEN) {
      // console.log('Fetching profile...')
      const res = await fetchMember.getProfile()
      // console.log('Profile fetched:', res)

      if (res.status !== 'Success') {
        USER_STORE.FN_LOGOUT()
        LOGIN_STORE.SHOW_LOGIN_MODAL = true
        // console.log('Invalid token, returning false')
        return false
      }
      USER_STORE.USER_INFO_REF = res.data
      return true
    } else {
      if (to.meta.requiresAuth) {
        LOGIN_STORE.TO_ROUTE = to.fullPath
        LOGIN_STORE.SHOW_LOGIN_MODAL = true
        if (from.name === undefined) {
          router.push('/')
        }
        return false
      } else {
        // console.log('No token and route does not require auth, returning true')
        return true
      }
    }

  })
  router.afterEach((to,from) => {
    const SEARCH_STORE = searchStore()
    if (from.name === 'proposals' && to.name !== 'proposals') {
      SEARCH_STORE.SEARCH_REF = ''
    }
  })
}

export default permission
