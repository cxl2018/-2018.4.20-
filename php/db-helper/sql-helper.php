<?php

//数据库连接，封装
function connect(){
    //1链接数据库
    $connect = mysqli_connect("127.0.0.1","root","root","alibaixiu");
//编码
    mysqli_set_charset($connect,"utf8");
    return $connect;
}

//查询语句
function query($sql){


    $connect = connect();
//    执行sql语句并且接收结果集,这是一个结果集，转换为我们数组的关联数组
   $res = mysqli_query($connect,$sql);
//    $row =mysqli_fetch_assoc($res)
//    返回值是一个二维数组
    $arr = array();
    while($row =mysqli_fetch_assoc($res)){
        $arr[]=$row;
    }

    return $arr;
}


//插入语句：返回的是布尔值，返回的值是告诉你，插入是否成功
function insert($arr,$table){
    /*
* insert into 表名(键，键，键)，value(值1，值2，值3),
* 但是我们获取的是一个数组，所以从数组里面获取到每个键和值，就是让键和值分开
*/
    $keys = array_keys($arr);
    $value = array_values($arr);
//echo json_encode($keys,JSON_UNESCAPED_UNICODE);
//echo json_encode($value,JSON_UNESCAPED_UNICODE);

//把从前端获取的数据插入到数据库里面
    $connect = connect();
//写sql语句
    $sql = "INSERT INTO {$table}(". implode(",",$keys) . ")value('".implode("','",$value)."')";

//echo json_encode($sql,JSON_UNESCAPED_UNICODE);

//执行sql语句
$ser= mysqli_query($connect,$sql);

    return $ser;
}

//修改/更新语句
function update($arr,$table,$id){
//    链接数据库
    $connect = connect();
//    写sql语句
    $sql = "UPDATE {$table} SET ";
    foreach ($arr as $key =>$value){
        $sql .=$key."='".$value."',";
    }
//    这时候多了一个,号，需要截取掉
    $sql = substr($sql,0,-1);
//    拼接要修改的条件
    $sql .= " where id={$id}";
//    执行sql语句
    $res = mysqli_query($connect,$sql);

    return $res;
}

//根据id删除语句
function delete($table,$id){
    //根据id查询sql语句
////链接数据库
//    $connect  = mysqli_connect("127.0.0.1","root","root","alibaixiu");
////编码
//    mysqli_set_charset($connect,"utf8");
    $connect = connect();
//写sql语句
    $sql = "DELETE FROM {$table} WHERE id = {$id}";
//执行sql代码
    $res = mysqli_query($connect,$sql);
//    返回的是布尔值
    return $res;
}

//封装好只执行sql语句的方法
function execute($sql){
    $connect = connect();
//写sql语句
//执行sql语句，返回的是布尔值，删除成功或失败
    $res = mysqli_query($connect,$sql);
//    接收返回值
    return $res;
}

?>