<?php

require_once  "../db-helper/sql-helper.php";

$id = $_POST["id"];
//因为对象里面包含多个id，所以我们遍历循环得到每一个id，根据id的索引进行删除
//但是我们数据库本身是一个json字符串，所以我们需要转换为对象才能遍历，需要所以把所有数据查找出来
//进行转换，再进行遍历，进行删除
$sql = "SELECT o.value FROM options o WHERE o.`key`= 'nav_menus'";
$res = query($sql);
$json = $res[0]["value"];
$arr = json_decode($json);
//echo "<pre>";
//print_r($arr);
//echo "</pre>";
//循环遍历得到id
foreach ($arr as $index => $value){
    if($value->id==$id){
//        根据索引删除，删除1个
       array_splice($arr,$index,1);
       break;
    }
}
//要把删除的id放到数据库更新内容，这时候需要转换成json格式字符串
$json = json_encode($arr,JSON_UNESCAPED_UNICODE);

//执行删除操作
$sql = "UPDATE options SET value='{$json}' WHERE `key` ='nav_menus'";
$res = execute($sql);

$arr_1 = array("code"=>200,"msg"=>"操作失败");
if($res){
    $arr_1["code"]=100;
    $arr_1["msg"]="操作成功";
}

echo json_encode($arr_1,JSON_UNESCAPED_UNICODE);










?>