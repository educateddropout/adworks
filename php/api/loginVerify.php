<?php

$database = require '..\bootstrap.php';
session_start();

// setting return value
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// /header('Content-Type: application/download; charset=utf-8');

// decoding of post data //
$data = json_decode(file_get_contents("php://input"), true);

// getting post data //
$username = $data['username'];
$password = $data['password'];

$returnJson = array();

$results = $database->authenticateUser($username,$password);

if($results){ //if returns true

	$_SESSION['adi_username'] = $username;
	$_SESSION['adi_user_id'] = $results[0]['user_id'];
	$_SESSION['adi_user_type'] = $results[0]['user_type'];
	$_SESSION['adi_nickname'] = $results[0]['nickname'];
	$_SESSION['adi_name'] = $results[0]['name'];;
	
	$returnJson['success'] = true;

}
else{

	$returnJson['success'] = false;
}

print_r(json_encode($returnJson));



?>