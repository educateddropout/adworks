<?php

$database = require '..\bootstrapFix.php';


$results = $database->fetchProducts();



foreach ($results  as $r) {
	$r1 = $database->fetchIncomingByProduct($r['product_id']);

	$totalReceived = 0;
	foreach ($r1  as $a) {
		$totalReceived += $a['quantity'];
	}
	print_r($totalReceived);


	$r2 = $database->fetchOutgoingByProduct($r['product_id']);
	$totalReleased = 0;
	foreach ($r2  as $b) {
		$totalReleased += $b['quantity'];
	}
	echo "|";
	print_r($totalReleased);

	$inventory = $totalReceived - $totalReleased;
	echo "|";
	print_r($inventory);
	
	$r3 = $database->updateInventory($r['product_id'], $inventory);

	echo "<br>";
}





?>