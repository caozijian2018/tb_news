
import Vue from 'vue'
import './api/all_request' // all request through here
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog'// error log
// import './permission' // permission control
import router from './router'
import './mock' // simulation data
import './assets/css/global_css.css' // simulation data
import 'driver.js/dist/driver.min.css'
import * as filters from './filters' // global filters
import "./directive/time_split"
import "./utils/message"
// import permis from  "./utils/permis"
import validate_input from  "./utils/validate_input"
import "babel-polyfill"
import "./utils/filter"
import  setTitle from  "./utils/set_title";
setTitle();
// if(localStorage.trak_token) permis()
Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
// register global utility filters.
// Object.keys(filters).forEach(key => {
//   Vue.filter(key, filters[key])
// })
Vue.prototype.c=(res,num)=>{
  if (num==1) console.log(res)
}
Vue.prototype.validate_input=validate_input;
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
