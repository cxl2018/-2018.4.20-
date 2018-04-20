<?php

//开启服务
session_start();
//清除之前存的sisionid
unset($_SESSION["user_id"]);

//$arr = array("code"=>200,"msg"=>"退出失败");

echo json_encode(
    array("code"=>100,"msg"=>"退出成功")
);

?>