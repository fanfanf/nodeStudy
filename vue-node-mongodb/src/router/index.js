import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/homePage',
      component: resolve => require(['../view/HomePage.vue'], resolve)
    },
    {
      path: '/systemSet',
      component: resolve => require(['../view/systemSetting/SystemSet.vue'], resolve)
    },
    {
      path: '/userManage',
      component: resolve => require(['../view/UserManage.vue'], resolve)
    },
    {
      path: '/phoneProduct',
      component: resolve => require(['../view/PhoneProduct.vue'], resolve)
    },
    {
      path: '/betterScroll',
      component: resolve => require(['../view/BetterScroll.vue'], resolve)
    }
  ]
})
