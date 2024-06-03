import './styles/index.scss'

//解决ElMessageBox弹窗无样式
import 'element-plus/theme-chalk/el-loading.css'

import 'element-plus/theme-chalk/el-message.css'

import 'element-plus/theme-chalk/el-notification.css'

import 'element-plus/theme-chalk/el-message-box.css'

import 'element-plus/theme-chalk/el-drawer.css'
//解决ElMessageBox弹窗无样式

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
///解决页面刷新没有动态路由
import type { RouteRecordRaw } from 'vue-router'
interface RouteItem {
  name: string
  path: string
  component: string
}
const routes: RouteItem[] = JSON.parse(window.localStorage.getItem('routeInfo') || '{}')
if (Object.keys(routes).length != 0) {
  const dynamicRoutes: RouteRecordRaw = {
    path: '/',
    name: '',
    component: () => import('@/components/layout/AppLayout.vue'),
    meta: { requiresAuth: true },
    children: routes.map((xp) => {
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
  router.addRoute(dynamicRoutes)
}

///解决页面刷新没有动态路由
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
