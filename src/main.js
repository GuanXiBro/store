import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/image/global.css';
import request from "@/utils/request";
import store from './store/store'
Vue.use(ElementUI,{size:"mini"});
Vue.config.productionTip = false

Vue.prototype.request=request
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
