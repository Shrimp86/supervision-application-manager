import axios, { type AxiosRequestHeaders } from 'axios'
import { useTokenStore } from '@/stores/mytoken'
import { refreshtoken } from '@/api/users'
import router from '@/router/index'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})
//接口请求前拦截加access_key
request.interceptors.request.use((config) => {
  if (!config.headers) {
    config.headers = {} as AxiosRequestHeaders
  }
  const store = useTokenStore()
  config.headers.Authorization = 'Bearer ' + store.token.access_token
  return config
})

request.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status == 401) {
      const { data } = await refreshtoken()
      if (data.success) {
        useTokenStore().saveToken(data.content)
        return request(error.config)
      } else {
        useTokenStore().saveToken('')
        router.push({ name: 'login' })
        return
      }
    }
    return Promise.reject(error)
  }
)

export default request
