<?php
include_once("../config.php");
//echo $_SERVER["REQUEST_METHOD"];
 
$id = $_GET['userId'];
if(isset($id)){
	$query = mysql_query("delete from users where id = {$id}");
	echo "success";	
}else{
	echo "Error found";	
}
?>

