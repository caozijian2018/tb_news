export default {
    login_name_reg:/^[\w\W]+@[^ ]+$/,
    login_password_reg:/^[^\s]{6,}$/,
    app_name:/^\w+$/,
    has_val:/^.+$/,
    not_null:/^[\w+-.]+$/,
    password:/^[\w]{6,}$/,
    reg:/^[\w\W]+$/,
    email:/^([\w])+\@([\w])+\.([A-Za-z]{2,4})$/,
    http:/^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?$/,
    param_url:/^(http|ftp|https):\/\/[^\s]+$/,
    is_ip:/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
    check(val,name_='not_null'){
        var is_correct=(this[name_].test(val)&&(val!=null));
        return is_correct;
    },
}