<?php

$database = require '..\bootstrap.php';


$results = $database->fetchOutgoingDeletedTransactions();


foreach ($results as $r) {

    //$results = $database->fetchOutgoingDeletedTransactions();
    # code...
    $total = $r['inventory_quantity'] + $r['quantity'];

    $rd = $database->updateProducts($r['product_id'], $total);
    
    print_r($total);
    echo "<br>";
}

$results = $database->fetchIncomingDeletedTransactions();


foreach ($results as $r) {

    //$results = $database->fetchOutgoingDeletedTransactions();
    # code...
    $total = $r['inventory_quantity'] - $r['quantity'];

    $rd = $database->updateProducts($r['product_id'], $total);

    print_r($total);
    echo "<br>";
}

//print_r($results);

?>