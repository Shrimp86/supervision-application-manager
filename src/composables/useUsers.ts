import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { login } from '@/api/users'
import { useTokenStore } from '@/stores/mytoken'
import { useRouter, useRoute } from 'vue-router'
import { getRoleMenuItem } from '@/api/menus'
import { useMenuStore } from '@/stores/mymenu'
import { useRouteStore } from '@/stores/myroute'
import { getRoleRouteItem } from '@/api/routes'

export function useUsers() {
  const form = reactive({
    user: '',
    pwd: ''
  })
  const rules = reactive<FormRules>({
    user: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      {
        pattern: /^[a-zA-Z][a-zA-Z0-9]+$/,
        message: '只能以字母开头只包含字母数字',
        trigger: 'blur'
      }
    ],
    pwd: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      {
        pattern: /^[a-z-A-Z0-9]+$/,
        message: '密码只能是数字和字母',
        trigger: 'blur'
      }
    ]
  })
  const formRef = ref<FormInstance>()
  const isLoading = ref(false)
  const tokenstore = useTokenStore()
  const menustore = useMenuStore()
  const router = useRouter()
  const route = useRoute()
  const routestore = useRouteStore()
  const onSubmit = async () => {
    isLoading.value = true
    await formRef.value?.validate().catch((err) => {
      ElMessage.error('表单验证失败')
      isLoading.value = false
      throw err
    })
    const tdata = await login({ userName: form.user, passWord: form.pwd }).then((res) => {
      if (!res.data.success) {
        ElMessage.error('用户名或者密码有误...')
        isLoading.value = false
        throw new Error('用户名或者密码有误')
      }
      return res.data
    })
    tokenstore.saveToken(tdata.content)
    const mdata = await getRoleMenuItem().then((res) => {
      if (res.data.code != '000000') {
        ElMessage.error('用户获取角色菜单失败')
        throw new Error('用户获取角色菜单失败')
      }
      return res.data
    })
    menustore.saveMenu(mdata.data)
    const rdata = await getRoleRouteItem().then((res) => {
      if (res.data.code != '000000') {
        ElMessage.error('用户获取角色路由失败')
        throw new Error('用户获取角色路由失败')
      }
      return res.data
    })
    routestore.saveRoute(rdata.data)
    isLoading.value = false
    ElMessage.success('登录成功')
    router.push((route.query.redirect as string) || '/')
  }
  return { form, rules, formRef, onSubmit }
}
