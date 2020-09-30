<?php

$database = require '..\bootstrap.php';

session_start();

// setting return value
header("Access-Control-Allow-Origin: *");
//header("Content-Type: application/json; charset=UTF-8");
header('Content-Type: application/download; charset=utf-8');
//header('Content-Type: text/plain; charset=utf-8');

// decoding of post data //
$data = json_decode(file_get_contents("php://input"), true);

$userId = $_SESSION['adi_user_id'];

$returnValue = array();
$returnValue["status"] = "ERROR";

$transaction_id = $data['transaction_id'];
$transaction_type = $data['transaction_type'];

try {

	$results = $database->voidTransaction($transaction_id, $userId, $transaction_type);

	if($transaction_type == 'O'){
		$results = $database->fetchOutgoingDeletedProducts($transaction_id);

		foreach ($results as $r) {

		    $total = $r['inventory_quantity'] + $r['quantity'];

		    $rd = $database->updateProducts($r['product_id'], $total);
		    
		}

	}

	if($transaction_type == 'I'){
		$results = $database->fetchIncomingDeletedProducts($transaction_id);

		foreach ($results as $r) {

		    $total = $r['inventory_quantity'] - $r['quantity'];

		    $rd = $database->updateProducts($r['product_id'], $total);
		    
		}
		
	}

	$returnValue["status"] = "SUCCESS";
	$returnValue["message"] = $results;

} 
catch(PDOException $e){
	$returnValue["status"] = "ERROR";
	$returnValue['message'] = $e;

}

print_r(json_encode($returnValue));


?>