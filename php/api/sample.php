<?php

$database = require '..\bootstrap.php';


$numberOfMonths = 6;

$resultsKamuning = $database->fetchCostSummary($numberOfMonths, "K");
$resultsMakati = $database->fetchCostSummary($numberOfMonths, "M");


$dateTime = new DateTime('first day of this month');
$dateTime->modify('-'.($numberOfMonths-1).' month');

$months = array();
$years = array();

for ($i = 1; $i <= 6; $i++) {
   
    array_push($months, $dateTime->format('n'));
    array_push($years, $dateTime->format('Y'));

    $dateTime->modify('+1 month');
}


$kData = array();
$mData = array();

for ($i = 0; $i < 6; $i++) {

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

    array_push($kData, $kAmount);
    array_push($mData, $mAmount);


}
print_r($kData);
print_r($mData);

?>