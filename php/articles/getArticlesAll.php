<?php
//直接查询，把数据返回给前端
require_once "../db-helper/sql-helper.php";

//写sql查询语句
$sql = "SELECT a.id,a.title,a.created,a.status,u.nickname,c.name FROM articles a LEFT JOIN users u ON a.user_id=u.id LEFT JOIN categories c ON a.category_id=c.id ";
//申明变量接收返回值，返回值是一个二维数组
$res = query($sql);

//$data =$res[0];
//echo "<pre>";
//print_r($data);
//echo "</pre>";
//如果按照上面只能获取一个id的值，所以不能有上一步操作
$arr = array("code"=>200,"msg"=>"操作失败");
if(!empty($res)){
        $arr["code"]=100;
        $arr["msg"]="操作成功";
        $arr["data"]=$res;
}
//echo "<pre>";
//print_r($arr);
//echo "</pre>";

echo json_encode($arr,JSON_UNESCAPED_UNICODE);

?>
