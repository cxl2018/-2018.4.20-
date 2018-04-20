<?php

require_once "../db-helper/sql-helper.php";
$id = $_POST["id"];
//echo "<pre>";
//print_r($id);
//echo "</pre>";

$res = delete("articles",$id);
//var_dump($res);
$arr = array("code"=>200,"msg"=>"操作失败");
if($res){

    $arr["code"]=100;
    $arr["msg"]="操作成功";
}

echo json_encode($arr,JSON_UNESCAPED_UNICODE);

?>