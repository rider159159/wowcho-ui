import { App } from 'vue';
import { createRouter, createWebHistory } from "vue-router"
import permission from './permission';
import DefaultLayout from '../layouts/DefaultLayout.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/demo',
      name: 'demo',
      component: () => import('../views/demo.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout 
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
    {
      path: '/projects/:id',
      name: 'projects',
      component: () => import('../views/projects/[id].vue'),
      meta: {
        keepAlive: false,
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
        layout: DefaultLayout 
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout 
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/signup/index.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout 
      }
    },
    
    // 錯誤頁面
    {
      path: '/error',
      name: 'error',
      component: () => import('../views/error.vue'),
      meta: {
        keepAlive: false,
      }
    },
    // 關於我
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/about/index.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout 
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
    // 隱私權
    {
      path: '/privacy_publicy',
      name: 'privacyPublicy',
      component: () => import('../views/privacyPublicy/index.vue'),
      meta: {
        keepAlive: false,
        layout: DefaultLayout 
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
    // 聯絡客服
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/contact/index.vue'),
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
        layout: DefaultLayout 
      }
    },
    // 商品詳細頁
    {
      path: '/proposal/:id',
      name: 'proposal',
      component: () => import('../views/proposal/[id].vue'),
      meta: {
        keepAlive: false,
      }
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
        layout: DefaultLayout,
      },
      children: [
        {
          path: 'resetPassword',
          component: () => import('../views/setting/resetPassword.vue'),
          meta: {
            requiresAuth: true 
          },
        },
        {
          path: 'profile',
          component: () => import('../views/setting/profile.vue'),
          meta: {
            requiresAuth: true 
          },
        },
      ],
    },
  ],
})

export function setupRouter(AppInstance:App<Element>) {
  permission(router);
  AppInstance.use(router);
}

export default router