import router from './router'
import NProgress from 'nprogress'  
import 'nprogress/nprogress.css' 
import hasLogin from "./utils/haslogin"
import initUser from "./utils/init_users"
initUser();
import allreques from "./api/all_request"
NProgress.configure({ showSpinner: false }) 
router.beforeEach((to, from, next) => {
  var haslogin = hasLogin();
  if(to.name=="login"){
    if(!haslogin){
      next();
      NProgress.done();
      return
    }else{
      next(false);
    }
  }else{
    if(!haslogin){
      next({path:"/login"});
    }else{
      var is_sp = localStorage.sp_user_type == 1;
      if(!is_sp && to.meta.allow=="sp"){
        next({name:"notfound"})
        return;
      }
      next()
    }
}
})
router.afterEach(() => {
  NProgress.done()
})
