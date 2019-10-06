import all_request from "./all_request"
export default ()=>{
    return new Promise(function(resolve,reject){
        all_request("user/perms/",{
          }).then((res)=>{
        resolve(res);
    }).catch((res)=>{
        reject(res);
    })
});
}