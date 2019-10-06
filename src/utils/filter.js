import Vue from "vue"
Vue.filter('fixed2', (val) => {
  return val.toFixed(2);
})
Vue.filter('stringify', (val) => {
  if (val) {
    return JSON.stringify(val);
  }else{
    return "null"
  }
})
Vue.filter('formatDate', (val) => {
  if (val) {
    return val.split(".")[0];
  }else{
    return "null"
  }
})
