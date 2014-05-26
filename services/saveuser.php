<?php

$con = mysql_connect("localhost", "root", "");
$db = mysql_select_db("service");

if(isset($_GET['username']) && isset($_GET['contact'])){
	$insert = mysql_query('insert into users(firstname, phone) VALUES("'.$_GET['username'].'", "'.$_GET['contact'].'")');
	echo "true";
}else{
	echo "false";	
}
 

?>
