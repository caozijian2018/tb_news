import store from "../store"
import all_request from "../api/all_request";
import Vue from "vue"
Vue.mixin({
  methods:{
    removePlace(val){
     return val.replace(/(^\s*)|(\s*$)/g,"");
    }
  },
  computed:{
    //perms
    is_s_admin(){
      return store.state.superuser_level==100
    },
    is_admin(){
      return store.state.superuser_level==200
    },
    allow_showaddtrak(){
      return store.state.perms.indexOf('add_tracker') > -1 ? true : false;
    },
    allow_show_add_company(){
      return false;
    },
    allow_show_add_user(){
      return store.state.perms.indexOf('add_user') > -1 ? true : false;
    },
    allow_show_edit_company(){
      return store.state.perms.indexOf('edit_company') > -1 ? true : false;
    },
    allow_show_edit_rules(){
      return true
    },
    allow_show_one_edit_rules(){
      return store.state.perms.indexOf('edit_roles') > -1 ? true : false;
    },
    allow_show_user_list(){
      return store.state.perms.indexOf('list_users') > -1 ? true : false;
    },
    allow_show_add_rule(){
      return store.state.perms.indexOf('add_roles') > -1 ? true : false;
    },
    allow_show_edit_user(){
      return store.state.perms.indexOf('list_users') > -1 ? true : false;
    },
    allow_show_change_user_password(){
      return store.state.perms.indexOf('change_user_pwd') > -1 ? true : false;
    },
    allow_show_add_app(){
      return store.state.perms.indexOf('add_app') > -1 ? true : false;
    },
    allow_show_edit_app(){
      return store.state.perms.indexOf('edit_app') > -1 ? true : false;
    },
    allow_show_trak_setting(){
      return store.state.perms.indexOf('edit_tracker') > -1 ? true : false;
    },
    allow_show_role_list(){
      return store.state.perms.indexOf('list_roles') > -1 ? true : false;
    },
    showaddtrak(){
      if(this.is_s_admin||this.is_admin){
        return true
      }else{
        return this.allow_allow_showaddtrak;
      }
    },
    show_add_company(){
      if(this.is_s_admin){
        return true
      }else{
        return this.allow_show_add_company;
      }
    },
    show_add_user(){
      if(this.is_s_admin||this.is_admin){
        return true
      }else{
        return this.allow_show_add_user;
      }
    },
    show_edit_company(){
      if(this.is_s_admin||this.is_admin){
        return true
      }else{
        return this.allow_show_edit_company;
      }
    },
    show_edit_rules(){
      if(this.is_s_admin||this.is_admin){
        return true
      }else{
        return true
      }
    },
    show_one_edit_rules(){
      if(this.is_s_admin||this.is_admin){
        return true
      }else{
        return this.allow_show_one_edit_rules;
      }
    },
    show_user_list(){
      if(this.is_s_admin||this.is_admin){
        return true
      }else{
        return this.allow_show_user_list;
      }
    },
    show_add_rule(){
      if(this.is_s_admin||this.is_admin){
        return true
      }else{
        return this.allow_show_add_rule;
      }
    },
    show_edit_user(){
      if(this.is_s_admin||this.is_admin){
        return true
      }else{
        return this.allow_show_edit_user;
      }
    },
    show_change_user_password(){
      if(this.is_s_admin||this.is_admin){
        return true
      }else{
        return this.allow_show_change_user_password;
      }
    },
    show_add_app(){
      if(this.is_s_admin||this.is_admin){
        return true
      }else{
        return this.allow_show_add_app;
      }
    },
    show_role_list(){
      if(this.is_s_admin||this.is_admin){
        return true
      }else{
        return this.allow_show_role_list;
      }
    },
    show_edit_app(){
      if(this.is_s_admin||this.is_admin){
        return true
      }else{
        return this.allow_show_edit_app;
      }
    },
    
    showaddtrak(){
      if(this.is_s_admin||this.is_admin){
        return true
      }else{
        return this.allow_showaddtrak;
      }
    },
    show_trak_setting(){
      if(this.is_s_admin||this.is_admin){
        return true
      }else{
        return this.allow_show_trak_setting;
      }
    },
  }
})
export default () => {
  all_request("user/perms/")
    .then(res => {
        store.state.superuser_level=res.data.superuser_level;
        store.state.perms=res.data.perms;
    })
    .catch(res => {
      // reject(res);
    });
};
