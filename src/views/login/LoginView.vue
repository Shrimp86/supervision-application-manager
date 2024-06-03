<script setup lang="ts">
import { useUsers } from '@/composables/useUsers'

const { form, rules, formRef, onSubmit } = useUsers()
</script>

<template>
  <div class="login">
    <el-form
      :model="form"
      :rules="rules"
      ref="formRef"
      label-width="120px"
      label-position="top"
      size="large"
    >
      <h2 style="text-align: center">监管应用平台</h2>
      <el-form-item label="用户名" prop="user">
        <el-input v-model="form.user" />
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" v-model="form.pwd" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.login {
  background-color: #ddd;
  height: 100vh; /*当前视窗的100%*/
  display: flex; /*开启弹性盒子*/
  flex-direction: row; /*弹性盒子主轴为行*/
  justify-content: center; /*主轴方向对齐方式居中*/
  align-items: center; /*辅轴（与主轴垂直）方向对其方式居中*/
  .el-form {
    /*嵌套进login样式下的el-form表单样式重写*/
    width: 300px; /*宽度300个逻辑像素*/
    background-color: #fff; /*背景颜色*/
    padding: 30px; /*el-form的内边距*/
    border-radius: 10px; /*el-form的外倒角弧度半径10个逻辑像素*/
    .el-form-item {
      /*嵌套进el-form样式下el-form-item表单项样式重写*/
      margin-top: 20px; /*外侧上部边距20个逻辑像素*/
    }
    .el-button {
      /*嵌套进el-form样式下el-button按钮样式重写*/
      width: 100%; /*宽度为父类元素尺寸的100%*/
      margin-top: 30px; /*外侧上部边距30个逻辑像素*/
    }
  }
}
</style>
