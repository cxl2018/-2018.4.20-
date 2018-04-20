<?php

require_once "../db-helper/sql-helper.php";
//在sql语句里面可以使用分页查询的语句

//    假设要获取第三页的10条数据
//从23页开始取，总共取10条,

//计算公式：SELECT * FROM articles a LIMIT 20,10
//计算公式：SELECT * FROM articles a LIMIT offset,count
//offset = (当前的页码-1)*count
//count 是每一页有多少数据
//获取我们需要显示的数据分别的页数,从哪里开始，一页有几条数据
//$sql = "SELECT a.id,a.title,a.status,a.created,u.nickname,c.name FROM articles a LEFT JOIN users u ON a.user_id=u.id LEFT JOIN categories c ON a.category_id=c.id LIMIT 20,10";

//当前页面也到一页有多少条数据都是从前端发送到后端的



//接收来自前端的数据，因为总的条数是在后端的，需要获取总的条数，再根据前端传过来每页的数量条数相除
//可以得到来自有页数的最大值，end的最大值
//当前页码
$currentPage = $_POST["currentPage"];
//每页的条数数量
$pageCount =$_POST["pageCount"];

//先计算出，从那一页开始获取，获取数据是多少条，比如从第3页开始获取，每一页的条数数量是10条
//第一页是10条，第二页也是10条，10+10=20，到第三页的时候就是从id就是21，每一页的条数是10条
//就可以直接获取到第三页的id从21-30之间，但是这样只有9条数据，所以我们需要计算的公式是：
$offset = ($currentPage-1)*$pageCount;

//到数据看进行查询，查询我需要查询的数据，所以并不是*，查询页面展示的那些数据，让他们以我们前端页面
//设置的当前页，一般从第一页开始，以10条形式显示
//写sql语句
$sql = "SELECT a.id,a.title,a.status,a.created,u.nickname,c.name FROM articles a LEFT JOIN users u ON a.user_id=u.id LEFT JOIN categories c ON a.category_id=c.id LIMIT {$offset},{$pageCount}";
//执行sql语句并且接收返回值
$res = query($sql);
//除了要书写展示在页面上的10条数据意外，还有最大值需要获取
$countSql =" SELECT COUNT(*)AS maxCount FROM articles a";
$countRes = query($countSql);

$arr = array("code"=>200,"msg"=>"操作失败");
if(!empty($res)){
    $arr["code"]=100;
    $arr["msg"]="操作成功";
    $arr["data"]=$res;
    $arr["dataCount"]=$countRes[0]["maxCount"];
}

echo json_encode($arr,JSON_UNESCAPED_UNICODE);




?>