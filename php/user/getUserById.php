<?php

require_once "../db-helper/sql-helper.php";
$user_id = $_POST["user_id"];

$sql = "SELECT * FROM users u WHERE u.id = {$user_id}";

$res = query($sql);

$arr = array("code"=>200,"msg"=>"操作失败");
if($res){
    $arr["code"]=100;
    $arr["msg"]="操作成功";
//    我们获取第一个id值就可以，因为邮箱和密码都被查找出来，所以为了安全着想，我们只带用户id回去
    $arr["data"]=$res[0];
}

echo json_encode($arr,JSON_UNESCAPED_UNICODE);




?>