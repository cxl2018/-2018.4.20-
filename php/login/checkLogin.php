<?php

header("Content-Type: text/html;charset=utf-8;");

$resArr = array("code"=>200,"msg"=>"登录失败，请重新登录");
session_start();
if(!empty($_SESSION)&& !empty($_SESSION["user_id"])){
//        如果判断不为空，并且曾经登录过，携带者病历本过来就是登录过成功
    $resArr["code"]=100;
    $resArr["msg"]="登录成功";
}
echo json_encode($resArr,JSON_UNESCAPED_UNICODE);

?>