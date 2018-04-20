// 入口函数

$(function () {
//    当点击的登录界面的时候，收集所有数据，发送请求到服务器

    $("#btn-login").on("click",function () {
        var data = $("#login-wrap").serialize();
        // console.log(data);
        $.post("../php/login/login.php",data,function(res){
            // console.log(res);
             if(res.code==100){
                // 如果登录成功，用户id就会从服务端返回过来，返回的cookie就存在浏览器，将来我们登录的
                // 的时候，就可以通过cookie获取到这id
                // 这里是使用cookie的插件
                //  console.log(re?s.user_id);
                //  path加一/让其目录到根目录上
                  $.cookie("user_id",res.user_id,{path:"/"});
                location.href ="../index.html";
             }else{
                 // console.log(1);
                 $(".alert").show();
             }
        },"json");
        return false;
    });
});