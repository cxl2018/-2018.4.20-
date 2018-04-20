<?php

require_once "../db-helper/sql-helper.php";
//echo "<pre>";
//print_r($_POST);
//echo "</pre>";

$id = $_POST["id"];
//因为文章id不需要更新的，所以id可以先删除，但是删除之前，需要先拿出来
unset($_POST["id"]);
//根据id进行修改语句
$res = update($_POST,"articles",$id);

$arr = array("code"=>200,"msg"=>"更新失败");
if($res){
    $arr["code"]=100;
    $arr["msg"]="更新成功";
}

echo json_encode($arr,JSON_UNESCAPED_UNICODE);


