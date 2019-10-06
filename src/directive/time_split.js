import Vue from "vue"
Vue.filter("timeSplit",(value)=>{
    return value.split('.')[0]
})