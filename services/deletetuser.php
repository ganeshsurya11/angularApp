<?php
ini_set('display_errors', 1);
 $con = mysql_connect("localhost", "root", "");
$db = mysql_select_db("service");

//echo $_SERVER["REQUEST_METHOD"];
 
$id = $_GET['userId'];
if(isset($id)){
	$query = mysql_query("delete from users where id = {$id}");
	echo "success";	
}else{
	echo "Error found";	
}
?>

