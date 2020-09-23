
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
} else {
	$branchName = "Makati";
	$branchEmail = "makatibranch@ampongdental.com";
}

$subject = "Inventory Receipt " . $date;

$email->addEmbeddedImage('../../assets/images/ad_logo.png', 'image_cid');
$email->SetFrom('admin@ampongdental.com', 'Ampong Dental Admin'); //Name is optional
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