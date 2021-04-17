<?php

class QueryBuilderFix

{

	protected $pdo;

	public function __construct($pdo)

	{

		$this->pdo = $pdo;

	}

	public function fetchProducts(){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT product_id

											FROM tbl_products

											WHERE archive = ?");

		$statement->execute([$archive]);
		
		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function fetchIncomingByProduct($productId){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT product_id, quantity 
												FROM tbl_products_received WHERE
													product_id = ? AND archive = ?");

		$statement->execute([$productId, $archive]);

		
		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function fetchOutgoingByProduct($productId){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT product_id, quantity 
												FROM tbl_products_released WHERE
													product_id = ? AND archive = ?");

		$statement->execute([$productId, $archive]);
		
		
		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function updateInventory($productId, $quantity){

		$archive = 1; // active

		$statement = $this->pdo->prepare("UPDATE tbl_products
												SET quantity = ?
												WHERE product_id = ?");

		$statement->execute([$quantity, $productId]);

		return $statement->rowCount();

	}

}
