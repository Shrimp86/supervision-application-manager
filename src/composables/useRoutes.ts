import { useRouteStore } from '@/stores/myroute'
import type { RouteRecordRaw } from 'vue-router'
import router from '@/router'

export function useRoutes() {
  const routestore = useRouteStore()
  const rawDynamicRoutes = routestore.route

  const dynamicRoutes: RouteRecordRaw = {
    path: '/',
    name: '',
    component: () => import('@/components/layout/AppLayout.vue'),
    meta: { requiresAuth: true },
    children: rawDynamicRoutes.map((xp) => {
      return {
        path: xp.path,
        name: xp.name,
        component: () =>
          import(
            `@/views/${xp.component.substring(0, xp.component.indexOf('/'))}/${xp.component.substring(xp.component.indexOf('/') + 1)}.vue`
          )
      }
    })
  }
  const merge = () => {
    router.addRoute(dynamicRoutes)
  }
  return { merge }
}

// 假设这是从服务器或某个逻辑中获取的动态路由

// 合并静态和动态路由
