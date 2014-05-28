<?php

$con = mysql_connect("localhost", "root", "");
$db = mysql_select_db("service");


$id 		=	isset($_REQUEST['id']) ? $_REQUEST['id'] : "";
$firstname 	=	isset($_REQUEST['firstname'])? $_REQUEST['firstname'] : "";
$phone 		=	isset($_REQUEST['phone'])? $_REQUEST['phone'] : "";


if(isset($firstname) && isset($phone)){
	
	if($_SERVER["REQUEST_METHOD"] == "POST"){
		$insert = mysql_query('insert into users(firstname, phone) VALUES("'.$firstname.'", "'.$phone.'")');
		//echo $_SERVER["REQUEST_METHOD"]."METHOD Inserted";
		echo "true";
	}
	else if($_SERVER["REQUEST_METHOD"] == "PUT" && $id){
		$update = mysql_query("update users set firstname = '{$firstname}', phone = '{$phone}' where id = {$id}");
		//echo $_SERVER["REQUEST_METHOD"]."METHOD - UPDATE";
		echo "true";
	}

}

?>
