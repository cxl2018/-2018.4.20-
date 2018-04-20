checkLogin();

$(function () {

function resizeWindow(){
    var tm = $(".main").width();
// 获取除开内边距以往的宽度
    $("#inner-frame").width(tm);

    var tm =$(window).height();
    $("#inner-frame").height(tm-66);
}
    $(window).on("resize",resizeWindow);
    resizeWindow();

//    页面跳转，当点击文章的时候，让页面进行跳转
    $(".aside a").on("click",function () {
        // 排除不需要跳转的页面,判断出需要跳转的a标签，所有文章有一个兄弟元素，其他的a标签没有其他兄弟
        // 意思就是说当没有兄弟的那位，进入判断，需要获取到它的href的属性，需要把属性赋值给
      if($(this).siblings().size()==0){
          //获取需要跳转的a标签的的属性，然后改变框架里面的一个属性的值，更改页面
          var src = $(this).attr("href");
          $("#inner-frame").attr("src",src);
        // 阻止a标签发生跳转
          return false;
      }
    });

//根据用户的id找到头像管理人名字，用户id我们之前存在cookie里面
    var user_id = $.cookie("user_id");
    // console.log(user_id);
    // 注意cookie所在的目录要设置的index在同一个根目录上，所以需要到登录设置下cookie的目录，根据poth
//    变成根目录，并且清除缓存
//    路径已经发生改变，现在请求的文件是在根目录里面的
    $.post("php/user/getUserById.php",{user_id:user_id},function (res) {
        //获取携带过来的数据，改变图片的路径和管理人名称
        console.log(res);
        $(".avatar").attr("src",res.data.avatar);
        $(".name").text(res.data.nickname);

    },"json");



//    点击退出登录的时候，清除sesion和cookie，去后台清除sesion，让其跳转到登录界面
    $("#logout").on("click",function () {
        //去后台请求sesion和cookie
        //因为一登录，过去服务端的时候，cookie也会携带过去，而sesion是基于cookie的
        var href = $(this).attr("href");
        $.post("php/login/logout.php",function (res) {
            // console.log(res);
            if(res.code==100){
            //    当删除成功sesion后，也需要删除浏览器的，cookie
                $.cookie("user_id",null);
                //因为这里涉及到this指向问题，这里需要改变this的指向，this指向调用该函数的那个对象
                //需要先把this保存起来
                location.href = href;
            }
        },"json");

        //只要是通过异步的，都需要阻止默认行为
        return false;
    })

});