import Vue from 'vue'
import request from '@/utils/request'
import api_list from './api_list'
import router from '@/router'
export default function allRequest(request_name, methods = 'get', params = {}, apiVersion) {
  var get_url_from_list = !request_name.match(/[\?\/]/)
  var url = get_url_from_list ? api_list[request_name] : request_name // +"?random" + Math.random() : request_name.includes('?') ? request_name + "&random=" + Math.random() : request_name + "?random=" + Math.random();//(get_url_from_list?api_list[request_name]:request_name)
  var version = apiVersion ? apiVersion : 'v1'
  var params_obj = {
    url: '/backend/api/' + version + '/' + url,
    method: methods
  }
  if (methods == 'get') {
    params_obj.params = params
  } else {
    params_obj.data = params
  }
  return request(params_obj)
}
Vue.prototype.$request_any = allRequest
