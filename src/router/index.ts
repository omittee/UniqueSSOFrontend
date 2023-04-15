import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/auth/login',
    name: 'LoginView',
    component: () => import("@views/LoginView.vue"),
    // alias: '/LoginView',
    meta: {
      title: '登录页面'
    }
  },
  {
    path: '/auth/memberSetting',
    name: 'MemberSettingView',
    component: () => import("@views/MemberSettingView.vue"),
    meta: {
      title: '角色设置页面'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});
export default router;
