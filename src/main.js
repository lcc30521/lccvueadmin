import Vue from 'vue'
import ElementUI from 'element-ui';  //组件库
import 'element-ui/lib/theme-chalk/index.css';   //样式
import App from './App.vue'
import store from './store'
import router from './router'
// 权限拦截
import './permisssion'
//使用elememtUL
Vue.use(ElementUI);
Vue.config.productionTip = false
console.log(process.env.VUE_APP_BASE_API)
new Vue({
  store,
  router,      //不要忘记引入
  render: h => h(App)
}).$mount('#app')
