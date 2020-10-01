
<?php


// setting return value
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$data = json_decode(file_get_contents("php://input"), true);


$branchCtr = $data['branch'];
$date = $data['date'];

require '../lib/PHPMailer/src/Exception.php';
require '../lib/PHPMailer/src/PHPMailer.php';
require '../lib/PHPMailer/src/SMTP.php';


$email = new PHPMailer(true);

$email->isHTML(true);

if($branchCtr == 'K'){
	$branchName = "Kamuning";
	$branchEmail = "kamuningbranch@ampongdental.com";
} else if($branchCtr == "M") {
	$branchName = "Makati";
	$branchEmail = "makatibranch@ampongdental.com";
} else if($branchCtr == "D") {
	$branchName = "Dental Arts";
	$branchEmail = "dentalartscorp@gmail.com";
}

//$subject = "Inventory Receipt " . $date;

$subject = "Inventory Receipt " . $date;

$email->addEmbeddedImage('../../assets/images/ad_logo.png', 'image_cid');
$email->SetFrom('headoffice.ampong@gmail.com', 'Ampong Dental Admin'); //Name is optional
$email->Subject   = $subject;

$email->Body      = "<img src='cid:image_cid'>
					<br>
					<br>
					Hi " . $branchName . ",<br><br>
						Please see attached receipt.";


$email->AddAddress( $branchEmail );
$email->AddCC('accounting@ampongdental.com', 'Ampong Dental Accounting');


$file_to_attach = '../pdf/releaseReceipt.pdf';

$email->AddAttachment( $file_to_attach , 'Receipt_'.$branchName.'_'.$date.'.pdf' );

$email->Send();
	



?>