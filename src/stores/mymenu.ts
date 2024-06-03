import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

//返回数据泛型
interface MenuItem {
  id: number
  name: string
  path: string
  icon: string
  functions: string
  children?: MenuItem[]
}

export const useMenuStore = defineStore('mymenu', () => {
  const menuJson = ref('')
  const menu = computed<MenuItem[]>(() => {
    try {
      return JSON.parse(menuJson.value || window.localStorage.getItem('menuInfo') || '{}')
    } catch (err) {
      ElMessage.error('JSON字符串格式不合格')
      throw err
    }
  })
  function saveMenu(data: string) {
    menuJson.value = data
    window.localStorage.setItem('menuInfo', data)
  }
  return { menu, saveMenu }
})
