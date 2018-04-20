
// 验证登录
checkLogin(true);
$(function () {
//    注册点击事件,使用图片实现异步上传
    /*
    一般文件上传的都是使用change事件，使用点击事件是没有效果的，因为
     是在一个form表单里面，表单元素里面是当velue值发生改变的时候出发
    就是不能让同一张图片出现第二次，或者让几率小到最小的时候就可以，使用事件戳和随机
     */

    $("#feature").on("change",function () {
        //通过以下方法获取控件里面所选中的文件
        // console.dir(this.files[0]);
        var file =this.files[0];
        // 通过服务端获取上传数据
        //通过以下方法在后端获取不到数据，因为jquery不提供上传资源类型的文件数据，
        //我们以下的的ajax上传方法就是调用jq，所以只能我们用自己原生的ajax或插件（flash）
        // $.post("../php/common/uploadFiles",{file:file},function (res) {
        //
        // })
        //自己创建的原生ajax五步骤
        var xhr =new XMLHttpRequest();
        xhr.open("post","../php/common/uploadFiles.php");
        //如果Content-type写的是application/x-www-form-urlencoded东西，它会写到$_post里面，

        // xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                //因为这个是我们自己写的原先ajax，所以需要自动把字符串转换成对象
                var res = JSON.parse(xhr.responseText);
                // console.log(res);
                if (res.code == 100) {
                    //substring(start,end)
                    //substr(start,length)
                    var path=res.path.substr(3);
                    // 给图片添加src路径，并且让其显示出现
                    $("#img_file").attr("src",path).show();
                    // console.log(xhr.responseText);
                //   因为在提交的时候，要把路径也存储到数据库，所以还要把name为feature的控件的value属性设置给它
                    $("#featuredata").val(res.path);
                }
            }
        }
            // xhr.send();
            // 如果要上传文件，就必须把文件变成字节流（文件流）
            var data = new FormData();
            data.append("file",file);
            xhr.send(data);
        });

    //    点击新增按钮的时候，获取数据
    //首先获取动态获分类数据
    $.post("../php/categories/getCategoriesAll.php",function (res) {
        // console.log(res);
    //    把内容添加到页面上，因为数据很少，所以使用拼接字符串,因为有多个，所以使用for循环
        var html = "";
        for(var i =0;i<res.data.length;i++){
            html += "<option value='"+res.data[i].id+"'>"+res.data[i].name+"</option>";
        }

        $("#category").html(html);
    },"json");


    // 这一部分是新增操作
    // //点击保存按钮的时候，手机所有数据使用异步，发送请求到后台
    // $("#btn-sure").on("click",function () {
    //
    //     //    手机所有数据
    //     var data = $("#articledata").serialize();
    //     // console.log(data);
    //     /*
    //         因为少了一个作者id，如何获取作者id，因为我们登录的时候，是根据作者id进行登录的认证的，
    //         所以在我们一登录的时候，让作者id存在浏览器，通过cookie进行储存在浏览器，因为sestion
    //         只有24分钟的实效，只有cookie是在关闭后才会自动关闭的，但是cookie存在不安全性，cookie一般是
    //         存在服务器，所以这里我们暂时使用cookie来代替
    //      */
    //     //    我们已经在后台里面获取cookie，然后返回登录浏览器，在我们一登录的时候已经获取到作者id
    //     //现在我们只要获取cookie里面的id即可
    //     var user_id = $.cookie("user_id");
    //     //把id添加到数据里面
    //     //title=%E5%A4%A9%E7%A9%BA&content=%E4%BD%A0%E5%A5%BD&slug=name&feature=..%2F..%2
    //     // Fuploads%2F151444551149399.jpg&category_id=3&created=
    //     // 2017-12-13T22%3A56&status=0    &user_id=4
    //     data += "&user_id=" + user_id;
    //     // console.log(data);
    //     $.post("../php/articles/addArticles.php",data,function (res) {
    //         // console.log(res);
    //         if(res.code=100){
    //             // alert(res.msg);
    //             //    美化弹出框
    //             layer.confirm("您想继续查看还是继续编辑呢？点击确定继续查看，点击取消继续编辑",
    //                 {icon:1},function (index) {
    //                     location.href = "articles.html";
    //                 });
    //         }else {
    //             layer.alert(res.msg,{icon:2});
    //         }
    //     },"json");
    //
    //     //阻止默认行为
    //     return false;
    // });




    //    点击编辑的时候获取id，首先判断这个id是不是修改的id，我们是根据文章id进行判断
    if(location.search){
        var articlesId = location.search.split("=")[1];
        // console.log(id);
        $.post("../php/articles/getArticlesById.php",{id:articlesId},function(res){
            console.log(res);
            if(res.code = 100){
                $("#title").val(res.data.title);
                $("#content").val(res.data.content);
                $("#slug").val(res.data.slug);
                $("#img_file").attr("src",res.data.feature).show();
                $("#featuredata").val(res.data.feature);
                $("#category").val(res.data.category_id);
                $("#created").val(res.data.created.replace(" ","T"));
                $("#status").val(res.data.status);
            }
        },"json");
    }else{
    //    新增逻辑
    }

//    点击保存的时候，收集所有数据到到服务端进行更新
    $("#btn-sure").on("click",function () {
    /*
    因为新增和更新是在同一个界面，所以我们需要判断是新增或是更新，怎么知道是更新呢，我们根据
    id得知，我们携带过去的数据需要携带id
     */
    //    收集所有数据
        if(location.search){
            //如果在这里面查找得到id，那就是更新操作
            //更新操作和新增操作都需要这一行代码，所以写在这里一起公用
            var data = $("#articledata").serialize();
            //因为入口函数里面的全局变量，在任何地方都可以访问到
            data  = data +"&id="+articlesId;
            $.post("../php/articles/upDataArticlesById.php",data,function (res) {
                console.log(res);
                if(res.code =100){
                    layer.confirm("您是需要查看还是继续编辑呢？点击确定是查看，点击取消是继续编辑",{icon:1},function (index) {
                    //        当点击查看的时候，跳转到也页面查看效果
                        location.href = "articles.html";
                    })
                    }else{

                        layer.alert(res.msg,{icon:2});
                }
            },"json");
        }else {

            // 以下是新增操作
        //     //    手机所有数据
        //     var data = $("#articledata").serialize();
            // console.log(data);
            /*
                因为少了一个作者id，如何获取作者id，因为我们登录的时候，是根据作者id进行登录的认证的，
                所以在我们一登录的时候，让作者id存在浏览器，通过cookie进行储存在浏览器，因为sestion
                只有24分钟的实效，只有cookie是在关闭后才会自动关闭的，但是cookie存在不安全性，cookie一般是
                存在服务器，所以这里我们暂时使用cookie来代替
             */
            //    我们已经在后台里面获取cookie，然后返回登录浏览器，在我们一登录的时候已经获取到作者id
            //现在我们只要获取cookie里面的id即可
            var user_id = $.cookie("user_id");
            //把id添加到数据里面
            //title=%E5%A4%A9%E7%A9%BA&content=%E4%BD%A0%E5%A5%BD&slug=name&feature=..%2F..%2
            // Fuploads%2F151444551149399.jpg&category_id=3&created=
            // 2017-12-13T22%3A56&status=0    &user_id=4
            data += "&user_id=" + user_id;
            // console.log(data);
            $.post("../php/articles/addArticles.php",data,function (res) {
                // console.log(res);
                if(res.code=100){
                    // alert(res.msg);
                    //    美化弹出框
                    layer.confirm("您想查看还是继续编辑呢？点击确定查看，点击取消继续编辑",
                        {icon:1},function (index) {
                            location.href = "articles.html";
                        });
                }else {
                    layer.alert(res.msg,{icon:2});
                }
            },"json");

        }

    //    因为这个是异步请求，所以需要阻止默认跳转
        return false;
    })


});

