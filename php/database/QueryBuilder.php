<?php

class QueryBuilder

{

	protected $pdo;
	public $defaulPassword = "ampongdental";

	public function __construct($pdo)

	{

		$this->pdo = $pdo;

	}

	public function checkIfUsernameExist($username){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT id
											FROM tbl_users
											WHERE username = ?");

		$statement->execute([$username]);

		return $statement->rowCount();
		//return $statement->errorInfo();

	}

	public function saveUser($data){

		$archive = 2; // pending for approval

		$currentDate = date("Y-m-d H:i:s");
		$password = "ampongdental"; //default password
		$isActive = 'Y';

		$userType = 1;

		$uuid = guidv4();

		$statement = $this->pdo->prepare("INSERT tbl_users (user_id, name, nickname, username, password, user_type, is_active, archive, last_modified)
											VALUES (?,?,?,?,?,?,?,?,?)" );

		$statement->execute([$uuid, $data['fullname'], $data['nickname'], $data['username'], md5($password), $userType, $isActive,  $archive, $currentDate]);

		return $statement->rowCount();

	}

	public function saveIncomingTransactions($products, $userId, $total_amount){
		
		$archive = 0; // active
		$currentDate = date("Y-m-d H:i:s");
		$transaction_id = guidv4();
		$type_of_transaction = "I";


		$statement = $this->pdo->prepare("INSERT INTO tbl_transactions
												(transaction_id, last_modified, last_modified_by, type_of_transaction, total_amount,
												archive)
											VALUES (?,?,?,?,?,?)");

		$statement->execute([$transaction_id, $currentDate, $userId, $type_of_transaction, $total_amount, $archive]);


		foreach ($products as $prod) {

			$statement = $this->pdo->prepare("SELECT quantity
											FROM tbl_products
											WHERE product_id = ?");

			$statement->execute([$prod['id']]);

			$rv = $statement->fetchAll(PDO::FETCH_ASSOC);

			$quantity = $rv[0]['quantity'] + $prod['quantity'];
			$current_price = $prod['product_price'];
			$product_id = $prod['id'];

			$statement = $this->pdo->prepare("UPDATE tbl_products
												SET current_price = ?, quantity = ?
												WHERE product_id = ?");

			$statement->execute([$current_price, $quantity, $product_id]);

			$statement = $this->pdo->prepare("INSERT INTO tbl_products_received
												(received_id, transaction_id, product_id, quantity,
													price, unit, last_modified, last_modified_by,
													expiration_date,archive)
											VALUES (?,?,?,?,
													?,?,?,?,
													?,?)");

			$statement->execute(productReceivedObj($transaction_id , $product_id, $prod, $userId));

		}

		return $statement->rowCount();


	}

	public function saveOutgoingTransactions($products, $userId, $branch){
		
		$archive = 0; // active
		$currentDate = date("Y-m-d H:i:s");
		$transaction_id = guidv4();
		$type_of_transaction = "O";
		$total_amount = 0;


		foreach ($products as $prod) {

			$statement = $this->pdo->prepare("SELECT quantity
											FROM tbl_products
											WHERE product_id = ?");

			$statement->execute([$prod['id']]);

			$rv = $statement->fetchAll(PDO::FETCH_ASSOC);

			$quantity = $rv[0]['quantity'] - $prod['quantity'];
			$product_id = $prod['id'];

			$statement = $this->pdo->prepare("UPDATE tbl_products
												SET quantity = ?
												WHERE product_id = ?");

			$statement->execute([$quantity, $product_id]);

			$statement = $this->pdo->prepare("INSERT INTO tbl_products_released
												(released_id, transaction_id, product_id, quantity,
													unit, last_modified, last_modified_by,
													product_price, amount,
													archive)
											VALUES (?,?,?,?,
													?,?,?,
													?,?,
													?)");

			$statement->execute(productReleasedObj($transaction_id , $product_id, $prod, $userId));

			$total_amount += $prod["amount"];

		}

		$statement = $this->pdo->prepare("INSERT INTO tbl_transactions
												(transaction_id, last_modified, last_modified_by, type_of_transaction, branch,
												archive, total_amount)
											VALUES (?,?,?,?,?,?,?)");

		$statement->execute([$transaction_id, $currentDate, $userId, $type_of_transaction, $branch, $archive, $total_amount]);

		



		return $statement->rowCount();


	}

	public function fetchReceivedProducts($dateTo, $dateFrom){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT r.received_id, r.transaction_id, r.product_id, p.name,
												r.price, r.unit, r.quantity, r.expiration_date, r.last_modified,
												r.last_modified_by, u.name as 'user_name'
											FROM tbl_products_received r
												LEFT JOIN tbl_products p ON p.product_id = r.product_id
												LEFT JOIN tbl_users u ON u.user_id = r.last_modified_by
											WHERE r.archive = ?
												AND DATE(r.last_modified) >= ? AND DATE(r.last_modified) <= ?
											ORDER BY r.last_modified DESC");

		$transaction = $statement->execute([$archive,$dateFrom, $dateTo]);
		
		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function fetchExpiredProducts(){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT r.received_id, r.transaction_id, r.product_id, p.name,
												r.price, r.unit, r.quantity, r.expiration_date, r.last_modified, r.is_consumed,
												r.last_modified_by, u.name as 'user_name'
											FROM tbl_products_received r
												LEFT JOIN tbl_products p ON p.product_id = r.product_id
												LEFT JOIN tbl_users u ON u.user_id = r.last_modified_by
											WHERE r.archive = ? AND r.expiration_date IS NOT NULL
											ORDER BY r.last_modified DESC");

		$transaction = $statement->execute([$archive]);
		
		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function fetchReleasedProducts($dateTo, $dateFrom){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT r.released_id, r.transaction_id, r.product_id, p.name,
												r.product_price, r.unit, r.quantity, r.amount, r.last_modified,
												r.last_modified_by, u.name as 'user_name', t.branch
											FROM tbl_products_released r
												LEFT JOIN tbl_products p ON p.product_id = r.product_id
												LEFT JOIN tbl_users u ON u.user_id = r.last_modified_by
												LEFT JOIN tbl_transactions t ON t.transaction_id = r.transaction_id
											WHERE r.archive = ?
												AND DATE(r.last_modified) >= ? AND DATE(r.last_modified) <= ?
											ORDER BY r.last_modified DESC");

		$transaction = $statement->execute([$archive,$dateFrom, $dateTo]);
		
		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function fetchTransactions(){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT t.transaction_id, lt.description as 'type_of_transaction', t.total_amount, t.last_modified, 
												t.last_modified_by, u.name
											FROM tbl_transactions t
												LEFT JOIN tbl_users u ON u.user_id = t.last_modified_by
												LEFT JOIN lib_transaction lt ON lt.id = t.type_of_transaction
											WHERE t.archive = ?
											ORDER BY t.last_modified DESC
											LIMIT 10");

		$transaction = $statement->execute([$archive]);
		
		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function fetchIncomingTransactions($dateTo, $dateFrom){

		$archive = 0; // active
		$type_of_transaction = "I"; // active

		$statement = $this->pdo->prepare("SELECT t.transaction_id, t.type_of_transaction, t.total_amount, t.last_modified, 
												t.last_modified_by, u.name, DATE(t.last_modified) AS date
											FROM tbl_transactions t
												LEFT JOIN tbl_users u ON u.user_id = t.last_modified_by
											WHERE t.archive = ? and t.type_of_transaction = ?
												AND DATE(t.last_modified) >= ? AND DATE(t.last_modified) <= ?
											ORDER BY t.last_modified DESC");

		$transaction = $statement->execute([$archive,$type_of_transaction,$dateFrom, $dateTo]);
		
		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function fetchOutgoingTransactions($dateTo, $dateFrom){

		$archive = 0; // active
		$type_of_transaction = "O"; // active

		$statement = $this->pdo->prepare("SELECT t.transaction_id, t.type_of_transaction, t.total_amount, t.last_modified, 
												t.last_modified_by, u.name, t.branch, DATE(t.last_modified) AS date
											FROM tbl_transactions t
												LEFT JOIN tbl_users u ON u.user_id = t.last_modified_by
											WHERE t.archive = ? AND t.type_of_transaction = ?
												AND DATE(t.last_modified) >= ? AND DATE(t.last_modified) <= ?
											ORDER BY t.last_modified DESC");

		$transaction = $statement->execute([$archive,$type_of_transaction,$dateFrom, $dateTo]);
		
		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function fetchIncomingTransactionProducts($transactionId){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT p.name, pr.quantity, pr.unit, pr.price, pr.expiration_date 
											FROM tbl_products_received pr
												INNER JOIN tbl_products p
													ON p.product_id = pr.product_id
											WHERE transaction_id = ?");

		$transaction = $statement->execute([$transactionId]);
		
		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function fetchOutgoingTransactionProducts($transactionId){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT p.name, pr.quantity, pr.unit, pr.product_price, pr.amount
											FROM tbl_products_released pr
												INNER JOIN tbl_products p
													ON p.product_id = pr.product_id
											WHERE transaction_id = ?");

		$transaction = $statement->execute([$transactionId]);
		
		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function voidTransaction($id, $userId, $transactionType){

		
		$currentDate = date("Y-m-d H:i:s");
		$archive = 1; // active

		$statement = $this->pdo->prepare("UPDATE tbl_transactions
											SET archive = ?, last_modified = ?, last_modified_by = ?
											WHERE transaction_id = ?");

		$statement->execute([$archive,$currentDate,$userId,$id]);

		if($transactionType == "I"){

			$statement = $this->pdo->prepare("UPDATE tbl_products_received
											SET archive = ?, last_modified = ?, last_modified_by = ?
											WHERE transaction_id = ?");

			$statement->execute([$archive,$currentDate,$userId,$id]);

		}

		if($transactionType == "O"){

			$statement = $this->pdo->prepare("UPDATE tbl_products_released
											SET archive = ?, last_modified = ?, last_modified_by = ?
											WHERE transaction_id = ?");

			$statement->execute([$archive,$currentDate,$userId,$id]);

		}

		return $statement->rowCount();


	}

	public function fetchLowStockProducts(){

		$archive = 0; // active
		$lowStock = 11;

		$statement = $this->pdo->prepare("SELECT p.product_id, p.name, u.description as 'unit', pt.description, 
											p.quantity

											FROM tbl_products p
												INNER JOIN lib_product_type pt ON pt.id = p.product_type
												INNER JOIN lib_unit u ON u.unit_id = p.unit
											WHERE p.archive = ? AND p.quantity < ?
											ORDER BY p.quantity, p.name DESC");

		$statement->execute([$archive, $lowStock]);
		
		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function fetchProduct(){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT p.product_id, p.supplier_id, s.supplier_name, p.name, p.unit, p.product_type, 
											pt.description as 'product_description',
											p.quantity, p.current_price, p.date_added

											FROM tbl_products p
												INNER JOIN tbl_supplier s ON s.supplier_id = p.supplier_id

												INNER JOIN lib_product_type pt ON pt.id = p.product_type
											WHERE p.archive = ?
											ORDER BY p.date_added DESC");

		$statement->execute([$archive]);
		
		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function saveProduct($productInfo, $userId){

		
		
		$archive = 0; // active

		$statement = $this->pdo->prepare("INSERT INTO tbl_products
												(product_id, supplier_id, name, unit, 
												product_type, quantity, last_modified, last_modified_by,
												current_price, date_added, archive)
											VALUES (?,?,?,?,
														?,?,?,?,
														?,?,?)");

		$statement->execute(productObj($productInfo, $userId, "SAVING"));



		return $statement->rowCount();


	}

	public function updateProduct($productInfo, $userId){

		
		$currentDate = date("Y-m-d H:i:s");
		$archive = 0; // active

		$statement = $this->pdo->prepare("UPDATE tbl_products
											SET supplier_id = ?, name = ?, unit = ?,
											product_type = ?, last_modified = ?, last_modified_by = ?,
											current_price = ?
											WHERE product_id = ?");

		$statement->execute(productObj($productInfo, $userId, "UPDATING"));

		return $statement->rowCount();


	}

	public function updateProductConsumed($productReceivedId, $userId, $consumedCtr){

		
		$currentDate = date("Y-m-d H:i:s");
		$archive = 0; // active 
		$is_consumed = 'Y';
		if($consumedCtr == 'Y') $is_consumed = 'N';

		$statement = $this->pdo->prepare("UPDATE tbl_products_received
											SET last_modified = ?, last_modified_by = ?,
											is_consumed = ?
											WHERE received_id = ?");

		$statement->execute([$currentDate,$userId, $is_consumed, $productReceivedId]);

		return $statement->rowCount();


	}

	public function archiveProduct($id, $userId){

		
		$currentDate = date("Y-m-d H:i:s");
		$archive = 1; // active

		$statement = $this->pdo->prepare("UPDATE tbl_products
											SET archive = ?, last_modified = ?, last_modified_by = ?
											WHERE product_id = ?");

		$statement->execute([$archive,$currentDate,$userId,$id]);

		return $statement->rowCount();


	}

	public function fetchSupplier(){

		$synced = 'N'; // not yet synced
		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT supplier_id, supplier_name, supplier_address, supplier_contact_number, supplier_contact_person,
													remarks, last_modified_by, last_modified
											FROM tbl_supplier
											WHERE archive = ?
											ORDER BY last_modified");

		$statement->execute([$archive]);
		
		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function saveSupplier($supplierInfo, $userId){

		
		
		$archive = 0; // active

		$statement = $this->pdo->prepare("INSERT INTO tbl_supplier
												(supplier_id, supplier_name, supplier_address, supplier_contact_number, 
												supplier_contact_person, remarks, last_modified, last_modified_by,
												archive)
											VALUES (?,?,?,?,
														?,?,?,?,
														?)");

		$statement->execute(supplierObj($supplierInfo, $userId, "SAVING"));



		return $statement->rowCount();


	}

	public function updateSupplier($supplierInfo, $userId){

		
		$currentDate = date("Y-m-d H:i:s");
		$archive = 0; // active

		$statement = $this->pdo->prepare("UPDATE tbl_supplier
											SET supplier_name = ?, supplier_address = ?, supplier_contact_number = ?,
											supplier_contact_person = ?, remarks = ?, last_modified = ?, last_modified_by = ?
											WHERE supplier_id = ?");

		$statement->execute(supplierObj($supplierInfo, $userId, "UPDATING"));

		return $statement->rowCount();


	}

	public function archiveSupplier($id, $userId){

		
		$currentDate = date("Y-m-d H:i:s");
		$archive = 1; // active

		$statement = $this->pdo->prepare("UPDATE tbl_supplier
											SET archive = ?, last_modified = ?, last_modified_by = ?
											WHERE supplier_id = ?");

		$statement->execute([$archive,$currentDate,$userId,$id]);

		return $statement->rowCount();


	}


	public function authenticateUser($username, $password){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT user_type, name, nickname, user_id, username
											FROM tbl_users
											WHERE username = ? and password = MD5(?) and archive = ?");

		$statement->execute([$username, $password, $archive]);

		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function resetUserPassword($data, $userId){

		
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE tbl_users
											SET password = ?, last_modified = ?, last_modified_by = ?
											WHERE user_id = ?");

		$statement->execute([md5($this->defaulPassword),$currentDate,$userId,$data['userId']]);

		return $statement->rowCount();


	}

	public function changePassword($password, $userId){

		$archive = 0; // active

		$statement = $this->pdo->prepare("UPDATE tbl_users
											SET password = ?
											WHERE user_id = ?");

		$statement->execute([md5($password),$userId]);

		return $statement->rowCount();
		//return $statement->errorInfo();

	}

	public function checkCurrentPassword($password, $userId){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT id, name, user_type
											FROM tbl_users
											WHERE password = ? and user_id = ?");

		$statement->execute([md5($password),$userId]);

		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}


	public function listOfUsers(){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT user_id as 'id', name, username, user_type,
											is_active, archive
											FROM tbl_users

											ORDER BY user_type DESC, name");

		$statement->execute();

		return $statement->fetchAll(PDO::FETCH_ASSOC);
		//return $statement->errorInfo();

	}

	public function lockUser($data, $userId){

		$archive = 1; // lock account
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE tbl_users
											SET archive = ?, last_modified = ?, last_modified_by = ?
											WHERE user_id = ?");

		$statement->execute([$archive,$currentDate,$userId,$data['userId']]);

		return $statement->rowCount();


	}

	public function unlockUser($data, $userId){

		$archive = 0; // active
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE tbl_users
											SET archive = ?, last_modified = ?, last_modified_by = ?
											WHERE user_id = ?");

		$statement->execute([$archive,$currentDate,$userId,$data['userId']]);

		return $statement->rowCount();


	}

	public function approveUser($data, $userId){

		$archive = 0; // active
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE tbl_users
											SET archive = ?, last_modified = ?, last_modified_by = ?
											WHERE user_id = ?");

		$statement->execute([$archive,$currentDate,$userId,$data['userId']]);

		return $statement->rowCount();


	}

	public function disApproveUser($data, $userId){

		$archive = 3; // declined/deleted
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE tbl_users
											SET archive = ?, last_modified = ?, last_modified_by = ?
											WHERE user_id = ?");

		$statement->execute([$archive,$currentDate,$userId,$data['userId']]);

		return $statement->rowCount();


	}

	public function promoteUser($data, $userId){

		$userType = 3; // superAdmin
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE tbl_users
											SET user_type = ?, last_modified = ?, last_modified_by = ?
											WHERE user_id = ?");

		$statement->execute([$userType,$currentDate,$userId,$data['userId']]);

		return $statement->rowCount();


	}

	public function demoteUser($data, $userId){

		
		$userType = 1; // administrator

		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE tbl_users
											SET user_type = ?, last_modified = ?, last_modified_by = ?
											WHERE user_id = ?");

		$statement->execute([$userType,$currentDate,$userId,$data['userId']]);

		return $statement->rowCount();

	}


}

function guidv4($data = null)
{	
	$data = $data ?? random_bytes(16);
	
    assert(strlen($data) == 16);

    $data[6] = chr(ord($data[6]) & 0x0f | 0x40); // set version to 0100
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80); // set bits 6-7 to 10

    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

function supplierObj( $supplierInfo, $userId, $ctr ){

	$currentDate = date("Y-m-d H:i:s");
	$archive = 0; // active

	$supplierArray = array();
	
	$supplier_name = strtoupper($supplierInfo['name']['value']);
	$supplier_address = strtoupper($supplierInfo['address']['value']);
	$supplier_contact_number = $supplierInfo['contactNumber']['value'];
	$supplier_contact_person = strtoupper($supplierInfo['contactPerson']['value']);
	$remarks = strtoupper($supplierInfo['remarks']['value']);


	if($ctr == "SAVING"){
		$supplier_id = guidv4();
		array_push($supplierArray,$supplier_id, $supplier_name, $supplier_address, $supplier_contact_number,
					$supplier_contact_person, $remarks, $currentDate, $userId,
					$archive);
	} else {

		$supplier_id = $supplierInfo['id']['value'];
		array_push($supplierArray, $supplier_name, $supplier_address, $supplier_contact_number,
					$supplier_contact_person, $remarks, $currentDate, $userId,
					$supplier_id);

	}

	return $supplierArray;

}


function productObj( $productInfo, $userId, $ctr ){

	$currentDate = date("Y-m-d H:i:s");
	
	$archive = 0; // active
	$quantity = 0;

	$productArray = array();
	

	$supplier_id = $productInfo['supplier']['value'];
	$name = strtoupper($productInfo['name']['value']);
	$unit = $productInfo['unit']['value'];
	$product_type = $productInfo['product_type']['value'];
	$current_price = $productInfo['current_price']['value'];


	if($ctr == "SAVING"){
		$product_id = guidv4();

		array_push($productArray,$product_id, $supplier_id, $name, $unit,
					$product_type, $quantity, $currentDate, $userId,
					$current_price,$currentDate,$archive);

	} else {

		$product_id = $productInfo['id']['value'];
		array_push($productArray, $supplier_id, $name, $unit,
					$product_type, $currentDate, $userId, $current_price,
					$product_id);

	}

	return $productArray;

}

function productReceivedObj($transaction_id , $product_id, $prod, $userId){

	$currentDate = date("Y-m-d H:i:s");
	$archive = 0; // active
	$received_id = guidv4();

	$quantity = $prod['quantity'];
	$price = $prod['product_price'];
	$unit = $prod['unit'];
	$expiration_date = $prod['expirationDate'] == '' ? null : $prod['expirationDate'];

	$productReceived = array();



	array_push($productReceived,$received_id, $transaction_id, $product_id, $quantity,
					$price, $unit, $currentDate, $userId,
					$expiration_date, $archive);

	return $productReceived;


}

function productReleasedObj($transaction_id , $product_id, $prod, $userId){

	$currentDate = date("Y-m-d H:i:s");
	$archive = 0; // active
	$received_id = guidv4();

	$quantity = $prod['quantity'];
	$unit = $prod['unit'];
	$product_price = $prod['product_price'];
	$amount = $prod['amount'];

	$productReleased = array();



	array_push($productReleased,$received_id, $transaction_id, $product_id, $quantity, 
				$unit, $currentDate, $userId, $product_price, $amount, $archive);

	return $productReleased;


}