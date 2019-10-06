import store from "../store";
import initUsers from "./init_users";
export default (token, username, password,trak_user_id,timezone)=>{
    localStorage.trak_token = token;
    localStorage.trak_username = username;
    localStorage.trak_password = password;
    localStorage.trak_user_id=trak_user_id;
    localStorage.timezone=timezone;
    initUsers();
    //store.dispatch("INIT_USER");
}