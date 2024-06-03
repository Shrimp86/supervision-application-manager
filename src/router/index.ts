import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useTokenStore } from '@/stores/mytoken'

export const staticRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/LoginView.vue')
  },
  {
    path: '/',
    name: '',
    component: () => import('@/components/layout/AppLayout.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: staticRoutes // 初始时不添加任何路由，稍后会合并静态和动态路由
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((r) => r.meta?.requiresAuth)) {
    const store = useTokenStore()
    if (!store.token.access_token) {
      next({ name: 'login', query: { redirect: to.fullPath } })
      return
    }
  }
  if (!to.matched.length) {
    next('')
    return
  }
  next()
})

export default router
