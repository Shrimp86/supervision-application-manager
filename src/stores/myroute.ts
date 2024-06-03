import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

//返回数据泛型
interface RouteItem {
  name: string
  path: string
  component: string
}

export const useRouteStore = defineStore('myroute', () => {
  const routeJson = ref('')
  const route = computed<RouteItem[]>(() => {
    try {
      return JSON.parse(routeJson.value || window.localStorage.getItem('routeInfo') || '{}')
    } catch (err) {
      ElMessage.error('JSON字符串格式不合格')
      throw err
    }
  })
  function saveRoute(data: string) {
    routeJson.value = data
    window.localStorage.setItem('routeInfo', data)
  }
  return { route, saveRoute }
})
