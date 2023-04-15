<script setup lang="ts">
import Logo from "@components/Logo.vue";
</script>

<template>
  <div class="container">
    <div class="team-info">
      <Logo />
      <div class="team-name">联创团队</div>
    </div>
    <div class="switch-bar">
      <router-link class="route" to="">主页</router-link>
      <router-link class="route" to="">我的申请</router-link>
      <router-link class="route" to="">个人信息</router-link>
      <div class="login-btn-container">
        <a-button type="primary" ghost id="btn-login">登录</a-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  color: #fff;
  .team-info {
    display: flex;
    align-items: flex-end;
    flex-shrink: 0;
    .team-name {
      font-size: 1.5rem;
    }
  }
  .switch-bar {
    display: flex;
    align-items: flex-end;
    .route {
      color: #fff;
      width: 5rem;
    }
    .login-btn-container {
      padding-left: 50px;
      #btn-login {
        color: #fff;
        border-color: #fff;
      }
    }
  }
}
</style>
