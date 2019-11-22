// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/index'
// 引入时间插件
import Util from './helpers/util' 
// 引入时间过滤器
import formateDate from './helpers/filter'

// 注册为全局过滤器
Vue.filter('formateDate', formateDate)
//注册为全局插件
Vue.use(Util)
Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
