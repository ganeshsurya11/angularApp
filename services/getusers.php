<?php

 $con = mysql_connect("localhost", "root", "");
$db = mysql_select_db("service");

$query = mysql_query("select * from users");
 

$users = array();
	if(mysql_num_rows($query)) {
		while($user = mysql_fetch_assoc($query)) {
			$users[] = $user;
		}
	}

header('Content-type: application/json');
$data = json_encode($users);


echo $data;

/*
[{"id":"4","firstname":"Rajesh","lastname":"pattil","phone":"9787","email":"raj@sfsafsad.com","city":"mumbai,pune"},{"id":"6","firstname":"Vilas","lastname":"Patil","phone":"8464","email":"vilkas@sfs.com","city":"mumbai"},{"id":"13","firstname":"Ganesh","lastname":"Surya","phone":"1246546","email":"ganesh_surya11@yahoo.co.in","city":"pune"}]
*/

?>
