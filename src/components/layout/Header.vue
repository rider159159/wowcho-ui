<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { userInfoStore, userLoginStore, searchStore } from '@/stores'
import { useClickOutside } from '@/composables'
const { SEARCH_REF, SEARCH_CONTROL } = storeToRefs(searchStore())
const store = userInfoStore()
const { USER_INFO_REF } = storeToRefs(store)
// 登出方法
const { FN_LOGOUT } = userInfoStore()
const router = useRouter()
// 登入、註冊
const currentComponent = ref('Login')
// 監聽登入註冊彈窗狀態
const LOGIN_STORE = userLoginStore()
// RWD Menu
const RWDMenu = ref(false)
// PC Menu
const showMemberMenu = ref(false)
// Header 背景色
const showBgWhite = ref(false)

// 登入註冊彈窗控制
const openLoginModal = () => { LOGIN_STORE.SHOW_LOGIN_MODAL = true }
const closeLoginModal = () => {
  LOGIN_STORE.SHOW_LOGIN_MODAL = false
  closeMenu()
}

function closeMenu() {
  RWDMenu.value = false
  showMemberMenu.value = false
}

function logoOut() {
  FN_LOGOUT()
  const currentRoute = router.currentRoute.value
  const routeIsRequiresAuth = currentRoute.meta.requiresAuth
  // 如果所在頁面需要登入踢回首頁頁面
  if (routeIsRequiresAuth) {
    router.push('/')
  } else { // 不需要登入的頁面刷新頁面
    location.reload()
  }
  closeMenu()
}

const isLogin = computed(() => USER_INFO_REF.value.email.length >= 1)

function toSearchPage () {
  RWDMenu.value = false
  if (router.currentRoute.value.name === 'proposals') { // 列表頁調整 control
    SEARCH_CONTROL.value = !SEARCH_CONTROL.value
  } else { // 非列表頁，帶 query
    router.push(`/proposals?search=${SEARCH_REF.value}`)
  }
}
const loginMenuRef = ref(null)
// 點及下拉選單以外地方，皆會關閉下拉選單
useClickOutside(loginMenuRef, () => { showMemberMenu.value = false })

const RWDMenuBtnRef: Ref<null | HTMLElement> = ref(null)

function RWDMenuControl () {
  RWDMenu.value = !RWDMenu.value
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    showBgWhite.value = window.pageYOffset > 0
  })
})
</script>

<template>
  <header class="fixed z-10 top-0 left-0 w-full bg-opacity-0">
    <nav
      class="relative flex w-full h-72px items-center justify-between ease-in duration-300 py-2 text-neutral-600 hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start"
      :class="{'bg-white': showBgWhite|| RWDMenu }"
      >
      <div class="flex w-full flex-wrap items-center justify-between px-6">
        <div
          class="container mx-auto !visible grow basis-[100%] items-center flex lg:basis-auto justify-between"
          id="navbarSupportedContentX">
          <img src="/logo.svg" @click="router.push({ name:'home' })" class="cursor-pointer max-w-[calc(100vw-150px)]">
          <div class="hidden lg:flex justify-between items-center relative">
            <div>
              <input @keyup.enter="toSearchPage" v-model="SEARCH_REF" type="text" name="search" placeholder="搜尋" class="w-80 outline outline-1 outline-brand-3 rounded-3xl py-2 px-5 pl-10">
            </div>
            <svg @click="toSearchPage" class="absolute left-3 top-1/2 -translate-y-1/2" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 20L15.514 15.506M18 9.5C18 11.7543 17.1045 13.9163 15.5104 15.5104C13.9163 17.1045 11.7543 18 9.5 18C7.24566 18 5.08365 17.1045 3.48959 15.5104C1.89553 13.9163 1 11.7543 1 9.5C1 7.24566 1.89553 5.08365 3.48959 3.48959C5.08365 1.89553 7.24566 1 9.5 1C11.7543 1 13.9163 1.89553 15.5104 3.48959C17.1045 5.08365 18 7.24566 18 9.5V9.5Z" stroke="#70BEFB" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <ul
            class="hidden lg:flex items-center gap-x-10">
            <li>
              <RouterLink
                class="block text-gray-2 transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 "
                to="/proposals"
                @click="closeMenu"
                >探索</RouterLink
              >
            </li>

            <li v-if="!isLogin">
              <div
                class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 "
                ><MyButton @click.prevent="openLoginModal" class="bg-brand-1 text-white outline outline-2 outline-brand-1 hover:bg-white hover:text-brand-1">登入/註冊</MyButton>
              </div>

            </li>
            <li v-if="isLogin" ref="loginMenuRef"  class="cursor-pointer relative" >
              <!-- 使用者預設頭像 -->
              <svg v-if="USER_INFO_REF.image == null" @click="showMemberMenu = !showMemberMenu" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 33V32C16 28.6863 18.6863 26 22 26H26C29.3137 26 32 28.6863 32 32V33" stroke="#369CF0" stroke-width="2" stroke-linecap="round"/>
                <path d="M24 23C21.7909 23 20 21.2091 20 19C20 16.7909 21.7909 15 24 15C26.2091 15 28 16.7909 28 19C28 21.2091 26.2091 23 24 23Z" stroke="#369CF0" stroke-width="2" stroke-linecap="round"/>
                <rect x="0.5" y="0.5" width="47" height="47" rx="23.5" stroke="#70BEFB"/>
              </svg>
              <!-- 使用者頭像 -->
              <img v-else :src="USER_INFO_REF.image" @click="showMemberMenu = !showMemberMenu" class="w-48px h-48px rounded-full">

              <!-- 下拉選單  -->
              <ul v-if="showMemberMenu"  class="member-menu z-10 absolute right-0 -bottom-40 w-40 bg-white">
                <li class="px-4 py-3">
                  <RouterLink
                    @click="showMemberMenu = !showMemberMenu"
                    to="/sponsorList"
                    class="block cursor-pointer transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 "
                    >贊助紀錄</RouterLink
                  >
                </li>
                <li class="px-4 py-3">
                  <RouterLink
                    @click="showMemberMenu = !showMemberMenu"
                    to="/setting/profile"
                    class="block cursor-pointer transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 "
                    >個人設定</RouterLink
                  >
                </li>
                <li class="px-4 py-3 border-t-1 border-line">
                  <a
                    @click.prevent="logoOut"
                    class="block w-full cursor-pointer transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 "
                    >登出</a
                  >
                </li>
              </ul>
            </li>
          </ul>

          <a ref="RWDMenuBtnRef" @click.prevent="RWDMenuControl"
            class="toggle-menu inline-block lg:hidden relative w-50px h-50px  cursor-pointer"
            :class="{'open': RWDMenu}"
          >
            <i></i>
            <i></i>
            <i></i>
          </a>

        </div>
      </div>
    </nav>
    <!-- RWD 選單 -->
    <transition name="slide">
      <div v-if="RWDMenu" class="fixed top-72px left-0 w-screen h-[calc(100vh-72px)] bg-white py-4 px-8">
        <div class="container h-full flex flex-col justify-between mx-auto">
          <div>
            <div class="w-full flex justify-between items-center relative mb-8">
              <input @keyup.enter="toSearchPage" v-model="SEARCH_REF" type="text" name="search" placeholder="搜尋" class="w-full outline outline-1 outline-brand-3 rounded-3xl py-2 px-5 pl-10">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 20L15.514 15.506M18 9.5C18 11.7543 17.1045 13.9163 15.5104 15.5104C13.9163 17.1045 11.7543 18 9.5 18C7.24566 18 5.08365 17.1045 3.48959 15.5104C1.89553 13.9163 1 11.7543 1 9.5C1 7.24566 1.89553 5.08365 3.48959 3.48959C5.08365 1.89553 7.24566 1 9.5 1C11.7543 1 13.9163 1.89553 15.5104 3.48959C17.1045 5.08365 18 7.24566 18 9.5V9.5Z" stroke="#70BEFB" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <ul>
              <li class="mb-8">
                <RouterLink
                  class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 text-lg py-2"
                  @click="closeMenu" to="/proposals"
                  >探索</RouterLink
                >
              </li>
              <li v-if="isLogin" class="mb-8">
                <div
                  class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 text-lg border-b-1 border-line pb-5"
                  >會員專區</div
                >
                <ul class="mt-3 ml-4">
                  <li class="mb-3">
                    <RouterLink
                      class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 py-2"
                      @click="closeMenu" to="/sponsorList"
                      >贊助紀錄</RouterLink
                    >
                  </li>

                  <li>
                    <RouterLink
                      class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 py-2"
                      @click="closeMenu" to="/setting/profile"
                      >個人設定</RouterLink
                    >
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <a
            v-if="!isLogin"
            class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 "
            href="#!"
            ><MyButton @click.prevent="openLoginModal" class="w-full bg-brand-1 text-white outline outline-2 outline-brand-1 hover:bg-white hover:text-brand-1">登入/註冊</MyButton>
          </a>

          <a
            v-if="isLogin"
            @click.prevent="logoOut"
            class="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 "
            href="#!"
            ><MyButton class="w-full outline outline-2 outline-brand-1 bg-white text-brand-1 hover:bg-brand-1 hover:text-white">登出</MyButton></a
          >
        </div>
      </div>
    </transition>
    <!-- 登入註冊彈窗 -->
    <Modal v-model="LOGIN_STORE.SHOW_LOGIN_MODAL" @update:modelValue="closeLoginModal">
      <Login v-if="currentComponent === 'Login'"
        @switchToSignup="currentComponent='Signup'"
        @closeModal="closeLoginModal"
      />
      <Signup v-if="currentComponent === 'Signup'"
        @switchToLogin="currentComponent='Login'"
      />
    </Modal>

  </header>
</template>

<style scoped lang="scss">
.member-menu {
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.16);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-enter-from {
  transform: translateX(-100%);
}

.slide-enter-to {
  transform: translateX(0);
}

.slide-leave-to {
  transform: translateX(-100%);
}

.toggle-menu {
  & i {
    position: absolute;
    display: block;
    height: 4px;
    background: #636466;
    left: 0px;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    border-radius: 20px;
  }

  & i:nth-child(1) {
    top: 16px;
    width: 32px;
  }

  & i:nth-child(2) {
    top: 26px;
    left: 3px;
    width: 25px;
  }

  & i:nth-child(3) {
    top: 36px;
    width: 32px;
  }

  &.open i:nth-child(1) {
    top: 25px;
    -webkit-transform: rotateZ(45deg);
    transform: rotateZ(45deg);
  }

  &.open i:nth-child(2) {
    background: transparent;
  }

  &.open i:nth-child(3) {
    top: 25px;
    -webkit-transform: rotateZ(-45deg);
    transform: rotateZ(-45deg);
  }
}
</style>
