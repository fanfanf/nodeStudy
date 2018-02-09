import Vue from 'vue'
import Vuex from 'vuex'
// 模块化
import systemSetting from './modules/systemSetting'
Vue.use(Vuex)
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    systemSetting
  }
})

export default store
