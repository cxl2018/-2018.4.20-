<?php

require_once  "../db-helper/sql-helper.php";
//直接查询数据，把数据返回浏览器
$sql = "SELECT o.value FROM options o WHERE o.`key`= 'nav_menus'";
$res = query($sql);

//echo "<pre>";
//print_r($res);
//echo "</pre>";
//exit();

//打印输出是一个字符串形式，所以我们需要先转换为数组或对象的形式
$json = $res[0]["value"];
$arr = json_decode($json);
//echo "<pre>";
//print_r($arr);
//echo "</pre>";
$arr_s = array("code"=>200,"msg"=>"操作失败");
if($arr){
    $arr_s["code"]=100;
    $arr_s["msg"]="操作成功";
    $arr_s["data"]=$arr;
}

echo json_encode($arr_s,JSON_UNESCAPED_UNICODE);







?>