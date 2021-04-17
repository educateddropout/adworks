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

$returnValue = array();
$returnValue["status"] = "ERROR";
$numberOfMonths = $data['numberOfMonths'];

try{

	$resultsKamuning = $database->fetchCostSummary($numberOfMonths, "K");
	$resultsMakati = $database->fetchCostSummary($numberOfMonths, "M");
	$resultsDentalArts = $database->fetchCostSummary($numberOfMonths, "D");
	$resultsEcodent = $database->fetchCostSummary($numberOfMonths, "E");

	$dateTime = new DateTime('first day of this month');
	$dateTime->modify('-'.($numberOfMonths-1).' month');

	$months = array();
	$years = array();

	for ($i = 1; $i <= $numberOfMonths; $i++) {
	   
	    array_push($months, $dateTime->format('n'));
	    array_push($years, $dateTime->format('Y'));

	    $dateTime->modify('+1 month');
	}


	$kData = array();
	$mData = array();
	$lData = array();
	$eData = array();

	$total = array();


	for ($i = 0; $i < $numberOfMonths; $i++) {

		$y = $years[$i];
		$m = $months[$i];

		$kAmount = 0;
		foreach ($resultsKamuning as $rk) {
	    	if($y == $rk['year'] && $m == $rk['month']) $kAmount = $rk['total_amount'];
	    }

	    $mAmount = 0;
	    foreach ($resultsMakati as $rm) {
	    	if($y == $rm['year'] && $m == $rm['month']) $mAmount = $rm['total_amount'];;
	    }

	    $lAmount = 0;
	    foreach ($resultsDentalArts as $rm) {
	    	if($y == $rm['year'] && $m == $rm['month']) $lAmount = $rm['total_amount'];;
	    }

	    $eAmount = 0;
	    foreach ($resultsEcodent as $rm) {
	    	if($y == $rm['year'] && $m == $rm['month']) $eAmount = $rm['total_amount'];;
	    }

	    array_push($kData, $kAmount);
	    array_push($mData, $mAmount);
	    array_push($lData, $lAmount);
	    array_push($eData, $eAmount);
	    array_push($total, $kAmount + $mAmount + $lAmount + $eAmount);


	}

	$returnValue["status"] = "SUCCESS";
	$returnValue['message']['kData'] = $kData;
	$returnValue['message']['mData'] = $mData;
	$returnValue['message']['lData'] = $lData;
	$returnValue['message']['eData'] = $eData;
	$returnValue['message']['total'] = $total;


}
catch(PDOException $e){

	$returnValue['message'] = $e;

}

print_r(json_encode($returnValue));


?>