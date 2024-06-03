<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  window.onload = () => {
    let lastTime = localStorage.getItem('lastTime')
    const interval = 3 * 1000
    if (!lastTime || new Date().getTime() - Number(lastTime) > interval) {
      localStorage.removeItem('tokenInfo')
      localStorage.removeItem('menuInfo')
      localStorage.removeItem('routeInfo')
      location.reload()
    }
  }
  window.onbeforeunload = () => {
    localStorage.setItem('lastTime', new Date().getTime().toString())
  }
})
</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped></style>
