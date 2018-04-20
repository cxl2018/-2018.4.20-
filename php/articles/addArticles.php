<?php

//接收来自前端的数据
//echo "<pre>";
//print_r($_POST);
//echo "</pre>";
//$_POST;
require_once  "../db-helper/sql-helper.php";

//执行sql语句并接收返回值
$res = insert($_POST,"articles");

//var_dump($res);

$arr = array("code"=>200,"msg"=>"操作失败");
if($res){
    $arr["code"]=100;
    $arr["msg"]="操作成功";
}

echo json_encode($arr,JSON_UNESCAPED_UNICODE);

?>