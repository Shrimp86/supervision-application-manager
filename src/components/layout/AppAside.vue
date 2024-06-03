<script setup lang="ts">
import { isCollapse } from './isCollapse'
import { useMenuStore } from '@/stores/mymenu'
import { useMenus } from '@/composables/useMenus'
import { computed } from 'vue'

const menustore = useMenuStore()

const { getValueByKeyFromMap, iconMapping } = useMenus()

const menuItems = computed(() => menustore.menu)
</script>

<template>
  <el-aside>
    <el-scrollbar>
      <el-menu router unique-opened :collapse="isCollapse">
        <a href="/" class="logo">
          <img src="@/assets/logo.svg" alt="logo" />
          <h1>监管应用</h1>
        </a>
        <template v-for="item in menuItems" :key="item.id">
          <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.id.toString()">
            <template v-slot:title>
              <el-icon><component :is="getValueByKeyFromMap(item.icon, iconMapping)" /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item v-for="child in item.children" :key="child.id" :index="child.path">
              <el-icon><component :is="getValueByKeyFromMap(child.icon, iconMapping)" /></el-icon>
              <span>{{ child.name }}</span>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item v-else :index="item.path" :key="item.id">
            <el-icon><component :is="getValueByKeyFromMap(item.icon, iconMapping)" /></el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style lang="scss" scoped>
.el-aside {
  //这个是element-plus的容器类
  background-color: #e9e9eb; //背景颜色
  height: 100vh; //相当于100%的视口高度
  width: auto; //宽度自动有子容器决定
}
.el-menu {
  //它既是el-aside的子容器，在此页面是也是唯一容器，所以既可以写在el-aside里面，也可以单独写
  background-color: #e9e9eb; //菜单背景颜色
  width: 200px; //菜单的宽度
  &.el-menu--collapse {
    //当el-menu的设置collapse的值为真
    width: 60px; //宽度缩小为60个逻辑像素
    border-right: none; //矩形方框的右边框不显示
    h1 {
      display: none; //当el-menu的设置collapse的值为真时h1标签不显示
    }
  }
}
.logo {
  //自定义logo容器区域
  display: flex; //开启弹性盒子
  justify-content: center; //主轴（默认水平轴）的对齐方式
  align-items: center; //与主轴垂直轴的对齐方式
  height: 60px; //弹性盒子的高度60个逻辑像素
  text-decoration: none; //由于此类是a标签使用，a标签文本自带下划线，此属性设为none去除下划线
  color: black; //字体颜色黑色
  img {
    //由于img是logo容器内的非容器html标签
    width: 32px; //img的宽度32个逻辑像素
    height: 32px; //img的高度32个逻辑像素
  }
}
</style>
