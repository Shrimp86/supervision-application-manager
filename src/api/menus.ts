import request from '@/utils/request'
//通用返回类型
type CommonData<T> = {
  code: string
  data: T
  mesg: string
  time: string
}
//返回数据泛型
export type Menu = {
  createdBy: string
  createdTime: string
  description: string
  href: string
  icon: string
  id: number
  level: number
  name: string
  operatorId: number | null
  orderNum: number
  parentId: number
  shown: boolean
  updatedBy: string
  updatedTime: string
  ver: string
}
//菜单信息接口调用
export const getall = () => {
  return request<CommonData<Array<Menu>>>({
    method: 'GET',
    url: '/Menu/GetAll'
  })
}
//export type MenuInfo=Partial<Menu>
export type MenuInfo = Pick<
  Menu,
  'parentId' | 'name' | 'href' | 'icon' | 'orderNum' | 'description' | 'shown'
> & { id?: number }
//export type MenuInfo=Omit<Menu,"createdBy"|"createdTime"|"level"|"operatorId"|"updatedBy"|"updatedTime">&{id?:number}
export const saveorupdate = (menuInfo: MenuInfo) => {
  return request<CommonData<boolean>>({
    method: 'POST',
    url: '/Menu/SaveOrUpdate',
    data: menuInfo
  })
}
export const deleteMenu = (id: string, ver: string) => {
  return request<CommonData<boolean>>({
    method: 'DELETE',
    url: `/Menu/DeleteMenu/${id}/${ver}`
  })
}
export type SubMenuList = Menu & { subMenuList: SubMenuList[] | null }
export type EditMenu = CommonData<{ menuInfo: Menu; parentMenuList: SubMenuList }>
export const getEditMenuById = (id: string) => {
  return request<EditMenu>({
    method: 'GET',
    url: '/Menu/GetEditMenu',
    params: {
      id
    }
  })
}

export const getRoleMenuItem = () => {
  return request<CommonData<string>>({
    method: 'GET',
    url: '/api/v1/UserRole/GetMenuItems'
  })
}
