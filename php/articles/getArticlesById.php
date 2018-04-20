<?php

require_once "../db-helper/sql-helper.php";
$id = $_POST["id"];
//echo $id;
//获取id进行查询语句

//写sql语句
$sql ="SELECT * FROM articles a WHERE id = {$id}";

$res = query($sql);
echo "<pre>";
print_r($res);
echo "</pre>";
exit();
$arr = array("code"=>100,"msg"=>"操作失败");
if($res){
    $arr["code"]=200;
    $arr["msg"]="操作成功";
    $arr["data"]=$res[0];
}

echo json_encode($arr,JSON_UNESCAPED_UNICODE);


?>