<?php

require_once "../db-helper/sql-helper.php";
//获取来自前端的id
$ids = $_POST["ids"];
//echo "<pre>";
//print_r($ids);
//echo "</pre>";


//根据id进行删除，但是因为是一个数组，所以我们这里用了新的方法
$sql = "DELETE FROM articles WHERE id IN (".implode(",",$ids).")";

$res = execute($sql);

//var_dump($res);
$arr = array("code"=>200,"msg"=>"操作失败");
if($res){
    $arr["code"]=100;
    $arr["msg"]="操作成功";
}

echo json_encode($arr,JSON_UNESCAPED_UNICODE);






?>