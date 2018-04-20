<?php

require_once "../db-helper/sql-helper.php";

//因为里面有分页和当前页，所以需要获取分页的内容
$currentPage =$_POST["currentPage"];
$pageCount =$_POST["pageCount"];
$offset = ($currentPage-1)*10;
//判断一开始是初始化状态：
//从前端接收来自分类和状态，先判断下一开始没有值的情况下，没有值的情况下，就是没有触发筛选
//如果一开始没有赋值的情况下，执行代码，会出现报错，因为我们需要json格式的字符串，没有赋值就不会返回
//这个json格式
//$category_id = $_POST["category_id"];
////获取分类
//$status = $_POST["status"];
//判断是否有赋值，如果有赋值了，直接进入里面获取这个状态和分类的值
//$_post是一个数组，所以如果数组没有索引的情况下，就会报错
if(isset($_POST["category_id"])){
    $category_id = $_POST["category_id"];
}
if(isset($_POST["status"])){
    $status = $_POST["status"];
}

//因为分类和状态是可以不用同时进行的，所以我们需要进行判断
//查询筛选条件中的分类和状态和分页以每页几条展示，从哪里开始
$sql = "SELECT a.id,a.title,a.created,a.status,u.nickname,c.name,a.category_id,a.user_id FROM articles a 
LEFT JOIN users u ON a.user_id = u.id LEFT OUTER JOIN categories c ON a.category_id=c.id";
//判断下分类和状态是否有赋值，如果有赋值就可以进行筛选
//如果分类和状态选中任意一个的情况下
//这是简化版的
 $condition = "";
if(isset($category_id)||isset($status)){
    $sql.=" where ";
    $condition .= " where ";
}
//判断其中一种情况存在，一个分类
if(isset($category_id)){
    $sql.= " a.category_id={$category_id} ";
    $condition.=" a.category_id={$category_id} ";
}
//还有一种情况，两个同时执行，如果一开始没有分类，就没有条件
//如果有分类，那就是使用and链接
if(isset($status)){
//    当有携带分类条件的时候
  if(isset($category_id)){
      $sql .=" and  a.status={$status} ";
      $condition .=" and  a.status={$status} ";

  } else{
      $sql .=" a.status={$status} ";
      $condition .=" a.status={$status} ";
  }
}
$sql .= " LIMIT {$offset},{$pageCount}";

//执行sql语句并接收放返回值
$res = query($sql);

echo "<pre>";
print_r($res);
echo "</pre>";
exit();
//分页除了当前页还有每一页的容量，还有一个总条数,这里的总数需要根据筛选条件来判断，所以我们又得
//获取一次筛选条件，我们使用一个人condition的空字符串把数据接收回来
$countSql = "SELECT COUNT(*) AS dataCount FROM articles a " . $condition ;

$countRes = query($countSql);
//因为我们一开始的状态是没有筛选的情况下，是初始化的样字的，所以这个需要动态传过来
//WHERE a.category_id = 2 AND a.status = 0


$arr =array("code"=>200,"msg"=>"操作失败");
if(!empty($res)){
    $arr["code"]=100;
    $arr["msg"]="操作成功";
    $arr["data"]=$res;
    $arr["dataCount"] = $countRes[0]["dataCount"];
}

echo json_encode($arr,JSON_UNESCAPED_UNICODE);

?>