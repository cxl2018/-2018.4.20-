<?php

header("Content-Type: text/html;charset=utf-8;");

//接收来自前端的数据
$email = $_POST["email"];
$password=$_POST["password"];

//根据用户名进行查找，用户名是唯一的，查询用户名，判断有用户名的话，再判断密码，如果密码对的话，即登录成功

//链接数据库，包含地址，用户名，密码，数据库
$connect = mysqli_connect("127.0.0.1","root","root","alibaixiu");
//设置编码格式
mysqli_set_charset($connect,"utf8");
//写sql语句
$sql = "SELECT * FROM users WHERE email = '{$email}'";
//执行sql语句并且接受返回值
$res = mysqli_query($connect,$sql);

//结果集转换为二维数组
//$row = mysqli_fetch_assoc($res);
$arr =array();
while ($row = mysqli_fetch_assoc($res)){
    $arr[]=$row;
}

//$data = $arr[0];
//echo "<pre>";
//print_r($data);
//echo "</pre>";
$resArr = array("code"=>200,"msg"=>"登录失败");
if(!empty($arr)){
//    echo "1";
//    如果用户名正确，进入密码验证
    if($arr[0]["password"] == $password && $arr[0]["status"]==1){
        //    操作成功
        $resArr["code"] = 100;
        $resArr["msg"]="登录成功";
//        在服务器获取uers——id这个值，让其返回浏览器，存在浏览器中
       $resArr["user_id"] = $arr[0]["id"];
//        保持状态，开启用户
        session_start();
//        把相关数据存到session里面,一般以使用id
        $_SESSION["user_id"] = $arr[0]["id"];
    }
}
echo json_encode($resArr,JSON_UNESCAPED_UNICODE);



?>