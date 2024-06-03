import request from '@/utils/request'
//通用返回类型
type CommonData<T> = {
  code: string
  data: T
  mesg: string
  time: string
}
export const getRoleRouteItem = () => {
  return request<CommonData<string>>({
    method: 'GET',
    url: '/api/v1/UserRole/GetRouteItems'
  })
}
