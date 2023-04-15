<script setup lang="ts"></script>

<template>
  <div class="logo-container">
    <img src="../assets/svg/logo.svg" alt="" class="logo" />
    <img src="../assets/svg/unique.svg" alt="" class="unique" />
    <img src="../assets/svg/studio.svg" alt="" class="studio" />
  </div>
</template>

<style scoped lang="less">
.logo-container {
  position: relative;
  margin: 0.6rem 4rem 0 0rem;
  cursor: pointer;
  .unique {
    position: absolute;
    left: 2.6rem;
    top: 1.3rem;
  }
  .studio {
    position: absolute;
    left: 3.3rem;
    top: 2.2rem;
  }
}
</style>
