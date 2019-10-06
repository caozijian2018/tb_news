import service_ from './request'
export default () => {
  var token = localStorage.sp_user_token ? localStorage.sp_user_token : null;
  service_.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}
