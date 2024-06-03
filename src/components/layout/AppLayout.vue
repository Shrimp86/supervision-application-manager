<script setup lang="ts">
import AppAside from './AppAside.vue'
import AppHeader from './AppHeader.vue'
import { useRoutes } from '@/composables/useRoutes'

const { merge } = useRoutes()
merge()
</script>

<template>
  <div class="common-layout">
    <el-container>
      <AppAside />
      <el-container class="Header-and-Main">
        <AppHeader />
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.Header-and-Main {
  display: flex;
  flex-direction: column;
}
.el-main {
  background-color: #f4f4f5;
  padding-right: 0;
}
</style>
