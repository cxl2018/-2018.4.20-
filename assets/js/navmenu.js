
//入口函数
$(function () {

//    查询导航菜单的渲染页面上，向服务端发送请求
    $.post("../php/setting/getNavMenus.php",function (res) {
            if(res.code==100){
                console.log(res);
            //    获取数据渲染到页面上
            //    1，引入模板
            //     2，写模板
            //    3调用模板方法
                var html = $("#tm").tmpl(res.data);
                $("#dataset").empty().append(html);
            }
    },"json");
//
// 删除逻辑，根据id进行删除，但是我们这里没有id，所以需要自己添加上id，自己在数据库添加id，然后获取id
//     根据id进行删除
$("#dataset").on("click",".del",function () {
        var that = this;
//优化layar，confirm本身就是询问语句，所以不需要判断
    layer.confirm("请问您确定要删除该数据吗?",{icon:1,title:"您正在执行删除操作"},function (index) {
            layer.close(index);
            var id = $(that).parent().parent().attr("delete_id");
            $.post("../php/setting/deleteNavData.php",{id:id},function (res) {
                    if(res.code==100){
                        layer.alert(res.msg,{icon:1});
                        location.reload();
                    }else{
                        layer.alert(res.msg,{icon:2});
                    }
            },"json");
    })
})


    //新增操作：
    //这里的图片获取我们建议使用委托，因为一般这些都是动态生成的
    $("#choose-icon").on("click",function () {
        $(".icon-list").show();
    });

    $(".icon-list").on("click","span",function (e) {
            //    改变元素属性，先获取点击的元素的属性，再更改点击元素的属性,因为class是关键词，所以不能拿来命名
            var cls = $(this).attr("class");
            $("#choose-icon>span").attr("class",cls);
            $(".icon-list").hide();
            e.stopPropagation();

            $("#icon").val(cls);

    })

//    数据保存,form表单提交的时候，记得查看提交按钮的type，如果是submit，一定是需要阻止默认行为
    $("#btn-sure").on("click",function () {
    //    收集form表单收据,根据name属性进行收集
       var data =  $("#nav-data").serialize();
    //    少了字体图标，因为icon图标没有，所以使用隐藏域，但是里面没有value值，需要
    //    我们把对应的的值添加进去
    //发现data里面的icon格式是有问题的，需要把+号替换成空格
        data = data.replace("+"," ");
        // console.log(data);
        $.post("../php/setting/addNavData.php",data,function (res) {
            console.log(res);





        },"json");
    })






//    入口函数结束
});
