import { useTokenStore } from '@/stores/mytoken'
import request from '@/utils/request'
//登录数据类型
type LoginInfo = {
  userName: string
  passWord: string
}
//通用返回类型
type CommonRT<T = string> = {
  state: number
  message: string
  content: T
  success: boolean
}
//登录返回数据类型
type LoginResult = CommonRT
//登录函数有输入输出
export const login = (loginInfo: LoginInfo) => {
  return request<LoginResult>({
    method: 'POST',
    url: '/api/v1/Log/UserLogin',
    data: loginInfo
  })
}
//用户信息数据类型
type Userinfo = CommonRT<{
  isupdatedpassword: boolean
  realname: string
  gender: string
}>
//获取用户信息函数
export const getinfo = () => {
  return request<Userinfo>({
    method: 'GET',
    url: '/api/v1/User/GetUserinfo'
  })
}
//退出返回数据类型
type LogoutResult = CommonRT
//系统退出函数
export const logout = () => {
  return request<LogoutResult>({
    method: 'POST',
    url: '/api/v1/Log/UserLogout'
  })
}
//交易密钥刷新返回数据类型
type RefreshResult = CommonRT
let isRefreshing = false
let promiseRT: Promise<any>
//交易密钥刷新函数
export const refreshtoken = () => {
  if (isRefreshing) {
    return promiseRT
  }
  isRefreshing = true
  const store = useTokenStore()
  promiseRT = request<RefreshResult>({
    method: 'POST',
    url: '/api/v1/Log/RefreshAccess',
    params: {
      Authorization: store.token.token_type + store.token.access_token,
      Refresh: store.token.refresh_token
    }
  }).finally(() => {
    isRefreshing = false
  })
  return promiseRT
}
