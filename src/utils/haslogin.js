// import router from "../router";
export default ()=>{
    var haslogin = localStorage.sp_user_token ? true :false;
    return haslogin;
}