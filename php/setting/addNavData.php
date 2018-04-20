<?php

require_once "../db-helper/sql-helper.php";

//echo "<pre>";
//print_r($_POST);
//echo "</pre>";


//查询表格原有的数据
$sql = "SELECT o.value FROM options o WHERE o.`key` = 'nav_menus'";

$res = query($sql);



$data = $res[0]["value"];




echo "<pre>";
print_r($res);
echo "</pre>";
//把数据放回数据库，进行更改操作
//把数据转换成json字符串
$json = json_decode($data);





?>