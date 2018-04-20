

//调用封装
function checkLogin(seep){
//    进入页面时，先判断该页面是否登录，如果没登录直接调整到登录页面，判断根据
//    session是否为空或根据唯一的id判断，判断id的值，这个数据是否对的，所以需要到后台请求询问
//    因为路径不一样，所以要传参
    var url = "php/login/checkLogin.php";
    var loginpages = "pages/login.html";
    if(seep){
        url = "../"+url;
        loginpages ="../"+loginpages;
    }

    $.post(url,function (res){
            if(res.code==200){
                location.href=loginpages;
            }
    },"json");
}