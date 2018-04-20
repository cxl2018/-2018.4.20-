
checkLogin(true);

$(function () {

//    前端向后端发送数据请求，需要动态生成的数据
//     $.post("../php/articles/getArticlesAll.php",function (res) {
//         // console.log(res);
//      if(res.code==100){
//      //    使用模板引擎渲染到页面
//      //     1引入模板引擎
//      //    2写模板，注意格式类型
//      //    3，调用模板的方法
//      //    把数据放到结果里面
//          var html = $("#tm").tmpl(res.data);
//      //    添加到页面
//          $("#dataset").append(html);
//      }else{
//          alert(res.msg);
//      }
//     },"json")

    // 把所有变量当到最前面
    // 总的数据条数
    var dataCount = 1004;
    //每页的数据量，这个我们可以自己决定
    var pageCount = 10;
    var maxCount =Math.ceil(dataCount/pageCount);
    // 按钮的总数
    var buttonCounts = 5;
    var start;
    // 当前页码，我们一般设置当前页码为1
    var current=1;
    //最后页码
    var end;
//    当前页码和每页的数据条数都是从后端获取数据

   // 先调用一次，在封装之前自己先调用一次，初始化
   //  getArticlesByPage();
   //  这个是根据分类来的，所以一开始不可以调用
   // 封装调用
   function getArticlesByPage(){

       //data要是一个对象，所以要判断是否是一个对象
       // data = data || {};
       //筛选点击的时候获取分类里面的内容
       var data = {};

       var category_id = $("#categories").val();
       var status = $("#status").val();

       //    因为前面已经声明过，所以这里不需要了

       // 一开始为空的时候，不要执行代码，也就是一开始不执行没有选中任何分类或状态的时候
       if(category_id != ""){
           data.category_id = category_id;
       }
       if(status != ""){
           data.status =status;
       }
       data.currentPage = current;
       data.pageCount = pageCount;
       $.post("../php/articles/getArticlesPageByCondition.php",data,function (res) {
           if(res.code==100){
               //    使用模板引擎渲染到页面
               // console.log(res);
               var html = $("#tm").tmpl(res.data);
               //    添加到页面
               // 在添加之前先把所有数据清空，在从表格里面添加数据
               $("#dataset").empty().append(html);
           }else{
               alert(res.msg);
           }
           // 获取总的数据条数，数据库已经响应我们，接收数据库的数据
           dataCount = res.dataCount;
           //此时的最大值需要根据数据库传回来的总的条数进行计算最大值
           maxCount =Math.ceil(dataCount/pageCount);
           //    所以以下的数据都需要在数据库传参回来后再执行，这样保证数据是最新的
           //开始页码计算
           start = current-Math.floor(buttonCounts/2);
           if(start<1){
               start=1;
           }
           //最后的页码
           end = start+(buttonCounts-1);
           if(end>maxCount){
               end=maxCount;
               //    让按钮显示5个，所以需要重新给开始页码计算
               start = end -(buttonCounts-1);
           }
           //先动态书写分页结构，按照一个上一页，一个下一页，还有5个数字按钮
           var html = "";

           if(current!=1){
               html +="<li><a href='javascript:void(0);' class='page-button' page='"+(current-1)+"'>上一页</a></li>";
           }
           for(var i =start;i<=end;i++){
               html+="<li><a href='javascript:void(0);' class='page-button' page ='"+i+"' >"+i+"</a></li>";
           }
           //需要获取每一个数字page ="+i+",自己添加一个属性
            if(current!=maxCount){
                html +="<li><a href='javascript:void(0);' class='page-button' page='"+(current+1)+"'>下一页</a></li>";
            }
           $("#pagination").html(html);


       },"json");

   }


//        写动态生成的按钮，根据页面展示
//    多少个按钮自己决定：7个按钮，一个上一页，一个下一页，剩下5个数字按钮
//     <a href="javascript:void(0);" class="page-button" page="1">上一页</a>
//    假设当前页码为5
//     var maxCount =101;
    //这个需要到后端获取，获取的当时是总的数据条数/每页的数据量=总共有多少页码

//    注册点击事件，因为是动态添加，所以是使用委托
    $("#pagination").on("click",".page-button",function () {
        // 目前是按照当前页为第一页，但是我们需要让页码随着我们的点击改变，进行改变
        var thisPage = parseInt($(this).attr("page"));
        current = thisPage;
        getArticlesByPage();

    });


//   筛选操作，直接向数据库获取
    $.post("../php/categories/getCategoriesAll.php",function (res) {
        // console.log(res);
    //    因为数据结构不够复杂，使用拼接字符串
    //    <!-- <option value="">所有分类</option>
    // <option value="">未分类</option> -->
        var html = "";
        html += "<option value=''>所有分类</option>";
        for(var i = 0;i<res.data.length;i++){
            //根据id获取分类里面的每一个内容
            html+="<option value='"+res.data[i].id+"'>"+res.data[i].name+"</option>";
        }
        $("#categories").html(html);
    //    使用html每次添加内容的时候，覆盖掉前面的
        getArticlesByPage();
    },"json");
    //点击筛选，从后端获取筛选条件和分页
    $("#queryby").on("click",function () {

        // //筛选点击的时候获取分类里面的内容
        // var category_id = $("#categories").val();
        // var status = $("#status").val();
        //
        // // console.log(category_id, status);
        //
        // var data = {}
        // //    因为前面已经声明过，所以这里不需要了
        //
        // // 一开始为空的时候，不要执行代码，也就是一开始不执行没有选中任何分类或状态的时候
        // if(category_id != ""){
        //     data.category_id = category_id;
        // }
        // if(status != ""){
        //     data.status =status;
        // }
        // $.post("../php/articles/getArticlesPageByCondition.php",data,function (res) {
        //     console.log(res);
        //
        // })
        getArticlesByPage();
    })






//    点击编辑的时候，携带着数据过来,委托，动态生成
    $("#dataset").on("click",".edit",function () {
        //获取页面跳转携带过来的id
        var id= $(this).parent().parent().attr("articles_id");
        //让页面进行跳转的时候携带着id
        location.href = "addArticle.html?id="+id;
    })

//    单个删除的操作：
//     委托
    $("#dataset").on("click",".del",function(){
    //    点击删除之前询问是否需要删除
    //    confirm("请问您确定需要删除该数据吗？")
    //     if(confirm("请问您确定需要删除该数据吗？")){
    //         //    根据id进行删除，获取id
    //         var id = $(this).parent().parent().attr("articles_id");
    //     //    根据id到服务端获取查询id并且获取数据
    //         $.post("../php/articles/deleteArticlesById.php",{id:id},function (res) {
    //             if(res.code ==100){
    //                 alert(res.msg);
    //             //    一般后台管理人都是直接设置页面刷新，但是这种有不好，会让浏览器和服务器频繁交互
    //                 location.reload();
    //             }else{
    //                 alert(res.msg);
    //             }
    //         },"json");
    //     }
            var that = this;
        //    优化版，使用layar.ul，一定要进入插件
        layer.confirm("请问您确定要删除该数据吗？",{icon:3,title:"您正在进行删除操作"},function (index) {
                    layer.close(index);
            var id = $(that).parent().parent().attr("articles_id");
                //    根据id到服务端获取查询id并且获取数据
                    $.post("../php/articles/deleteArticlesById.php",{id:id},function (res) {
                        if(res.code ==100){
                            layer.alert(res.msg);
                        //    一般后台管理人都是直接设置页面刷新，但是这种有不好，会让浏览器和服务器频繁交互
                            location.reload();
                        }else{
                            layer.alert(res.msg);
                        }
                    },"json");
        })

    })


/*
以下是批量删除，一般批量效果是，单个选中至少两个，才算批量
 */
//第一种情况：点击全选按钮的时候，下面的单个按钮都被选中，根据属性选择器

    $("thead input[type=checkbox]").on("click",function () {
    //    目前全选框是已经被选中，获取其他单个按钮的，并且设置他们的状态跟全选框是一样
    //设置单个按钮的属性，根据全选的一致,checked是一个属性
    //    获取全选按钮的属性，再把属性赋值给所有单个按钮，如果全选被选中，单选也就跟着被选中
        var res = $(this).prop("checked");
        $("#dataset input[type=checkbox]").prop("checked",res);
    //    判断，当被选中的时候，让批量删除按钮显示出来
        if(res){
            $("#del_s").show();
        }else{
            $("#del_s").hide();
        }
    })

//    第二种情况：当点击单个按钮的时候，如果单个按钮是全部打钩的情况下，让全选按钮打钩
//    第三种情况：当单个按钮有哪一个没有被选中的情况下，全选按钮取消打钩
//    单选框是动态生成的，所以需要委托
    $("#dataset").on("click","input[type=checkbox]",function () {

    // //    当单个按钮全部被选中的情况下，一个是长度，一个当前页有多少条数据
    //     if($("#dataset input[type=checkbox]:checked").size()==pageCount){
    //     //        这时候是全选中，让全选按钮状态等于单个按钮，true
    //         $("thead input[type=checkbox]").prop("checked",true);
    //     }else {
    //         $("thead input[type=checkbox]").prop("checked",false);
    //     }
    //    声明单个按钮被选中的长度
        var count_s = $("#dataset input[type=checkbox]:checked").size();
        //获取属性的值，获取单个按钮被全选中的值
        $("thead input[type=checkbox]").prop("checked",count_s==pageCount);
        //点选按钮超过两个，让批量删除按钮显示出来
        if(count_s>=2){
            $("#del_s").show();
        }else {
            $("#del_s").hide();
        }
        // 第二种做法
        $("thead input[type=checkbox]").prop("checked",$("#dataset input[type=checkbox]:checked").size()==pageCount);

    })

//    点击批量删除按钮的时候
    $("#del_s").on("click",function () {
    //    获取id,,根据id去后台获取删除数据，因为是批量的，所以是多个，这里我们以
    //     一个数组形式传参过去，现在使用一种jq里面原先封装好的遍历循环的方法
    //    找到所有单个按钮，获取数据的长度
        var skc = $("#dataset input[type=checkbox]:checked");
        //声明一个数组，循环遍历得到每一个单个按钮的id
        var ids =[];
        //jq的循环封装方法，index是每个数组的索引，element是每一个删除按钮，是一个dow对象，需要转换为
        // jq对象
        skc.each(function (index,element) {
          var id =  $(element).parent().parent().attr("articles_id");
          //把循环遍历得到的每一个id添加到数组里面，
          ids.push(id);
        });

        // console.log(ids);

        //    把id带到服务端进行查询
        $.post("../php/articles/getArticlesByIdMultiple.php",{ids :ids},function (res) {
            // console.log(res);
            if(res.code==100){
                layer.alert(res.msg,{icon:1},function () {
                    location.reload();
                });
            }else{
                layer.alert(res.msg,{icon:2},function (index) {
                    layer.close(index);
                });
            }

        },"json");

    })













//    入口函数
});