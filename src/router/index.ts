import { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import permission from './permission'
import DefaultLayout from '@/components/layoutWrapper/DefaultLayout.vue'
import HomeLayout from '@/components/layoutWrapper/HomeLayout.vue'
import noneHeader from '@/components/layoutWrapper/noneHeader.vue'
import FullWidthLayout from '@/components/layoutWrapper/FullWidthLayout.vue'
const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/demo',
      name: 'demo',
      component: () => import('../views/demo.vue'),
      meta: {
        keepAlive: false,
        layout: noneHeader,
        requiresAuth: true
      }
    },
    {
      path: '/demo2',
      name: 'demo2',
      component: () => import('../views/demo2.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout
      }
    },
    // 以上範例用
    // 首頁
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home/index.vue'),
      meta: {
        keepAlive: false,
        layout: HomeLayout
      }
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: () => import('../views/login/index.vue'),
    //   meta: {
    //     keepAlive: false,
    //     layout: DefaultLayout
    //   }
    // },
    // {
    //   path: '/signup',
    //   name: 'signup',
    //   component: () => import('../views/signup/index.vue'),
    //   meta: {
    //     keepAlive: false,
    //     layout: DefaultLayout
    //   }
    // },
    // 贊助紀錄
    {
      path: '/sponsorList',
      name: 'sponsor',
      component: () => import('../views/sponsor/sponsorList.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout,
        requiresAuth: true,
        title: '贊助紀錄 | 渦潮 WowCho'
      }
    },
    {
      path: '/sponsor/:id',
      name: 'sponsorDetail',
      component: () => import('../views/sponsor/[id].vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout,
        requiresAuth: true,
        title: '贊助詳情 | 渦潮 WowCho'

      }
    },
    // 錯誤頁面
    {
      path: '/:catchAll(.*)',
      name: 'error',
      // component: () => import('../views/error.vue'),
      component: () => import('../views/error/index.vue'),
      meta: {
        keepAlive: false,
        title: '404 | 渦潮 WowCho'
      }
    },
    // 關於我們
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/about/index.vue'),
      meta: {
        keepAlive: false,
        layout: FullWidthLayout,
        title: '關於我們 | 渦潮 WowCho'
      }
    },
    // 使用條款
    {
      path: '/terms_of_use',
      name: 'termsOfUse',
      component: () => import('../views/termsOfUse/index.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout
      }
    },
    // 隱私權條款
    {
      path: '/privacy_publicy',
      name: 'privacyPublicy',
      component: () => import('../views/privacyPublicy/index.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout
      }
    },
    // 常見問題
    {
      path: '/common_problem',
      name: 'commonProblem',
      component: () => import('../views/commonProblem/index.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout
      }
    },
    // 商品列表
    {
      path: '/proposals',
      name: 'proposals',
      component: () => import('../views/proposals/index.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout,
        title: '探索提案 | 渦潮 WowCho'
      }
    },
    // 商品詳細
    {
      path: '/proposal/:proposal',
      name: 'proposal',
      component: () => import('../views/proposal/[id].vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout
      },
      children: [
        // 查看商品內頁
        {
          path: '',
          name: 'proposalContent',
          component: () => import('../views/proposal/content.vue'),
          meta: {
            title: '提案詳情 | 渦潮 WowCho'
          }
        }
        // 查看與選擇贊助方案
        // {
        //   path: 'plan',
        //   name: 'proposalPlan',
        //   component: () => import('../views/proposal/plan.vue')
        // }
      ]
    },
    // 選擇贊助方式
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/cart/index.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout,
        requiresAuth: true
      },
      children: [
        // 查看商品內頁
        {
          path: '',
          name: 'cartContent',
          component: () => import('../views/cart/content.vue'),
          meta: {
            title: '贊助提案 | 渦潮 WowCho'
          }
        },
        // 查看與選擇贊助方案
        {
          path: 'success',
          name: 'cartSuccess',
          component: () => import('../views/cart/success.vue'),
          meta: {
            title: '贊助成功 | 渦潮 WowCho'
          }
          // component: () => import('../views/cart/content2.vue'), //test
        }
      ]
    },
    // 忘記密碼
    {
      path: '/forgot_password',
      name: 'forgotPassword',
      component: () => import('../views/forgotPassword/index.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout
      }
    },
    // 修改密碼、編輯個人
    {
      path: '/setting',
      name: 'setting',
      component: () => import('../views/setting/index.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout
      },
      children: [
        {
          path: 'resetPassword',
          component: () => import('../views/setting/resetPassword.vue'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'profile',
          component: () => import('../views/setting/profile.vue'),
          meta: {
            requiresAuth: true,
            title: '個人資料 | 渦潮 WowCho'

          }
        }
      ]
    },
    // 提案者賣場
    {
      path: '/users/:userId',
      name: 'users',
      component: () => import('../views/users/index.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout
      }
    }
  ]
})

export function setupRouter(AppInstance:App<Element>) {
  permission(router)
  AppInstance.use(router)
}

export default router
