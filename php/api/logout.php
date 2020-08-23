<?php

session_start();

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

	unset($_SESSION['adi_username']);
	unset($_SESSION['adi_user_id']);
	unset($_SESSION['adi_user_type']);
	unset($_SESSION['adi_nickname']);
	unset($_SESSION['adi_name']);

?>