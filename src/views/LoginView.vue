<script setup lang="ts">
import LoginTopBar from "@components/LoginTopBar.vue";
import LoginForm from "@components/LoginForm.vue";
</script>

<template>
  <a-layout class="main">
    <a-layout-header class="login-layout-header"
      ><LoginTopBar
    /></a-layout-header>
    <a-layout-content class="login-layout-content"
      ><LoginForm
    /></a-layout-content>
  </a-layout>
</template>

<style scoped lang="less">
.main {
  background-image: url('../assets/img/loginBg.jpg');
  .login-layout-header {
    height: 7.5rem;
    background-color: rgba(49, 84, 174, 0.58);
    backdrop-filter: blur(6px);
  }
  .login-layout-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 7.5rem);
  }
}
</style>
