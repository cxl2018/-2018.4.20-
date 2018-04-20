<?php

//$file = $_POST["file"];
//echo "<pre>";
//print_r($file);
//echo "</pre>";

//echo "<pre>";
//print_r($_FILES);
//echo "</pre>";

//通过$_FILES可以拿到文件，现在我们已经拿到流文件，需要进行转存

//转存的方法
//move_uploaded_file(文件流临时存储的位置，路径+你想要保存的文件的名称)

//move_uploaded_file($_FILES["file"]["tmp_name"],$_FILES["file"]["name"]);
//我们约定把图片放在uploads里面，所以我们可以把自己原先的图片清空，剪切放到其他位置，然后我们点击上传
//文件，把图片的路径保存到我们约定的最新文件夹里面,/是打开文件的意思
//move_uploaded_file($_FILES["file"]["tmp_name"],"../../uploads/",$_FILES["file"]["name"]);

//$poth = "../../uploads/". $_FILES["file"]["name"];
//$_FILES["file"]["name"]文件名原来的名字
////echo $poth;
//move_uploaded_file($_FILES["file"]["tmp_name"],$poth);
//如果保存原来的文件名，如果重名会被覆盖掉，所以我们需要采取时间戳和随机的策略
//命名：  时间戳(秒) + 随机数 + 后缀名
//time() + 随机数 + .jpg
//首先获取我们需要的内容，一个是后缀名，需要获取到. 加后缀名 ../../uploads/widget_5.jpg
//需要切割文件名 ，explode(以什么来切割，需要切割的数组)
$arrFileExt = explode(".",$_FILES["file"]["name"]);
$ext = end($arrFileExt);
$fileName = time().rand(10000,99999).".".$ext;

//确定路径一定是存在的
$path = "../../uploads/";
//所以需要先判断路径是否存在
if(!file_exists($path)){
//    如果不存在，我们自己创建一个
    mkdir($path);
}
//转存，这个是有返回值的，如果成功就是true，如果失败就是false
$res = move_uploaded_file($_FILES["file"]["tmp_name"],$path.$fileName);

$arr = array("code"=>200,"msg"=>"操作失败");
if($res){
    $arr["code"]=100;
    $arr["msg"]="操作成功";
//    因为我们图片的路径是隐藏的，我们需要携带src路径一起
    $arr["path"]=$path.$fileName;
}

echo json_encode($arr,JSON_UNESCAPED_UNICODE);