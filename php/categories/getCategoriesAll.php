<?php


require_once  "../db-helper/sql-helper.php";


//写sql语句获取所有的分类数据
$sql = "SELECT * FROM categories c";
//执行sql语句，并且接收返回值
$res = query($sql);

$arr = array("code"=>200,"msg"=>"操作失败");
if(!empty($res)){
    $arr["code"]=100;
    $arr["msg"]="操作成功";
    $arr["data"]=$res;
}

echo json_encode($arr,JSON_UNESCAPED_UNICODE);


?>