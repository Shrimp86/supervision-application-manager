import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface Token {
  user_id: number
  expires_in: number
  scope: string
  jti: string
  access_token: string
  refresh_token: string
  token_type: string
  organization: string
}

export const useTokenStore = defineStore('mytoken', () => {
  const tokenJson = ref('')
  const token = computed<Token>(() => {
    try {
      return JSON.parse(tokenJson.value || window.localStorage.getItem('tokenInfo') || '{}')
    } catch (err) {
      ElMessage.error('JSON字符串格式不合格')
      throw err
    }
  })
  function saveToken(data: string) {
    tokenJson.value = data
    window.localStorage.setItem('tokenInfo', data)
  }
  return { token, saveToken }
})
