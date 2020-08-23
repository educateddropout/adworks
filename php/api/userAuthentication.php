<?php

session_start();

// setting return value
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// /header('Content-Type: application/download; charset=utf-8');

$returnJson = array();

if(isset($_SESSION['adi_username'])){

	$returnJson['username'] = $_SESSION['adi_username'];
	$returnJson['id'] = $_SESSION['adi_user_id'];
	$returnJson['userType'] = $_SESSION['adi_user_type'];
	$returnJson['nickname'] = $_SESSION['adi_nickname'];
	$returnJson['name'] = $_SESSION['adi_name'];
	$returnJson['allowedAccess'] = 1; // true
}
else{
	
	$returnJson['allowedAccess'] = 0; //false

}

print_r(json_encode($returnJson));


?>