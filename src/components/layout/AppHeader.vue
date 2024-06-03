<script setup lang="ts">
import { isCollapse } from './isCollapse'
import { ref } from 'vue'
import { getinfo, logout } from '@/api/users'
import { gethead } from '@/assets/heads'
import { useRouter } from 'vue-router'
import { useTokenStore } from '@/stores/mytoken'
import { useMenuStore } from '@/stores/mymenu'
import { useRouteStore } from '@/stores/myroute'

const store = useTokenStore()
const mstore = useMenuStore()
const router = useRouter()
const ustore = useRouteStore()
const userinfo = ref({ gender: '', realname: '' })
const atm = ref('图片加载失败')
getinfo().then((res) => {
  console.log(res)
  userinfo.value = res.data.content
})
const handlelogoff = async () => {
  const data = await logout().then((res) => {
    return res.data
  })
  if (data.state == 0) {
    store.saveToken(data.content)
    mstore.saveMenu('')
    ustore.saveRoute('')
    await router.push('login')
  } else {
    store.saveToken('')
    mstore.saveMenu('')
    ustore.saveRoute('')
    await router.push('login')
  }
}
</script>

<template>
  <el-header>
    <el-icon @click="isCollapse = !isCollapse">
      <IEpExpand v-show="isCollapse" />
      <IEpFold v-show="!isCollapse" />
    </el-icon>

    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">promotion management</a></el-breadcrumb-item>
      <el-breadcrumb-item>promotion list</el-breadcrumb-item>
      <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
    </el-breadcrumb>

    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="32" :alt="atm" :src="gethead(userinfo.gender)" />
        <el-icon class="el-icon--right"> <IEparrow-down /> </el-icon>
      </span>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>{{ userinfo.realname }}</el-dropdown-item>
          <el-dropdown-item divided @click="handlelogoff">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>

<style lang="scss" scoped>
.el-header {
  //容器类型类使用.
  display: flex; //开启弹性盒子
  align-items: center; //与主轴垂直轴的对齐方式居中
  background-color: #dedfe0;
  .el-icon {
    //图标容器使用.
    margin-right: 17px; //右侧外边距17个逻辑像素
  }
}
.el-dropdown {
  margin-left: auto; //左外边距自动
  .el-dropdown-link {
    //el-dropdown下的el-dropdown-link（span）容器样式
    display: flex; //开启弹性盒子
    justify-content: center; //主轴方向居中
    align-items: center; //与主轴垂直轴的对齐方式
  }
}
</style>
