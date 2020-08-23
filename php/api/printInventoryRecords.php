<?php
	
	$database = require '..\bootstrap.php';
	session_start();
	// setting return value
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

	$data = json_decode(file_get_contents("php://input"), true);

	$userId = $_SESSION['adi_user_id'];
	$results = 
	//$results = $database->getPaymentRecordById($data['payment_id']);


	//print_r($results);
	printReceipt($data["records"]);


	function printReceipt($data){

		require("../lib/fpdf/fpdf.php");

		$f = new NumberFormatter("en", NumberFormatter::SPELLOUT);

		class PDF extends FPDF
		{

			//Cell with horizontal scaling if text is too wide
		    function CellFit($w, $h=0, $txt='', $border=0, $ln=0, $align='', $fill=false, $link='', $scale=false, $force=true)
		    {
		        //Get string width
		        $str_width=$this->GetStringWidth($txt);

		        //Calculate ratio to fit cell
		        if($w==0)
		            $w = $this->w-$this->rMargin-$this->x;
		        $ratio = ($w-$this->cMargin*2)/$str_width;

		        $fit = ($ratio < 1 || ($ratio > 1 && $force));
		        if ($fit)
		        {
		            if ($scale)
		            {
		                //Calculate horizontal scaling
		                $horiz_scale=$ratio*100.0;
		                //Set horizontal scaling
		                $this->_out(sprintf('BT %.2F Tz ET',$horiz_scale));
		            }
		            else
		            {
		                //Calculate character spacing in points
		                $char_space=($w-$this->cMargin*2-$str_width)/max($this->MBGetStringLength($txt)-1,1)*$this->k;
		                //Set character spacing
		                $this->_out(sprintf('BT %.2F Tc ET',$char_space));
		            }
		            //Override user alignment (since text will fill up cell)
		            $align='';
		        }

		        //Pass on to Cell method
		        $this->Cell($w,$h,$txt,$border,$ln,$align,$fill,$link);

		        //Reset character spacing/horizontal scaling
		        if ($fit)
		            $this->_out('BT '.($scale ? '100 Tz' : '0 Tc').' ET');
		    }

		    //Cell with horizontal scaling only if necessary
		    function CellFitScale($w, $h=0, $txt='', $border=0, $ln=0, $align='', $fill=false, $link='')
		    {
		        $this->CellFit($w,$h,$txt,$border,$ln,$align,$fill,$link,true,false);
		    }

			// Page header
			function Header()
			{
			    // Logo
			    //$ampongDentalLogo = "images/ad_horizontal.jpg";
			    //$this->Image($ampongDentalLogo,90,6,40);
			    // Arial bold 15
			    if (!$this->skipHeader) {
			            // ...
			        
				    $this->SetFont('Arial','B',15);
				    // Move to the right
				    $this->Cell(80);
				    // Title
				    $this->Cell(30,10,'AMPONG DENTAL CLINIC',0,0,'C');
				    // Line break
				    $this->Ln(20);
			    }
			}

			// Page footer
			function Footer()
			{
				if (!$this->skipFooter) {
				    // Position at 1.5 cm from bottom
				    $this->SetY(-15);
				    // Arial italic 8
				    $this->SetFont('Arial','I',8);
				    // Page number
				    $this->Cell(0,10,'Page '.$this->PageNo().'/{nb}',0,0,'C');
				}
			}
		}

		// Instanciation of inherited class
		$pdf = new PDF("P", "mm", array(210 ,297 ));
		$pdf->AliasNbPages();
		$pdf->skipHeader = true;
		$pdf->skipFooter = true;
		$pdf->AddPage();
		$pdf->SetFont('Times','',10);

		$yAxis = 13;
		$pdf->SetY(13);
		$pdf->SetX(5);
		$pdf->SetFont('Times','B',14);
		$pdf->Cell(200,4,"AMPONG DENTAL CLINIC",0, 2, 'C');
		$pdf->SetFont('Times','',10);
		$pdf->Cell(200,4,"2F Kamuning Place, Kamuning Road,",0, 2, 'C');
		$pdf->Cell(200,4,"Quezon City, Philippines",0, 2, 'C');
		$pdf->Cell(200,4,"Phone: (02) 8281-5482",0, 2, 'C');
		$pdf->Cell(200,4,"Cellphone: (63) 9178835013",0, 2, 'C');

		$pdf->SetY(43);
		$pdf->SetX(5);
		$pdf->SetFont('Times','B',15);
		$pdf->Cell(200,4,"Inventory Report",0, 2, 'C');


		$pdf->SetY(53);
		$pdf->SetX(5);
		$pdf->SetFont('Times','',10);
		$yAxis = 53;

		$totalAmount = 0;
		$i = 1;
		foreach ($data as $d) {
			$yAxis += 5;
			$pdf->SetY($yAxis);
			$pdf->SetX(5);
			$pdf->CellFitScale(10,5,$i,1, 0, 'L', 0);
			$pdf->CellFitScale(60,5," ".$d["name"],1, 0, 'L', 0);
			$pdf->CellFitScale(45,5," ".$d["product_description"],1, 0, 'L', 0);
			$pdf->CellFitScale(45,5," ".$d["supplier_name"],1, 0, 'L', 0);
			$pdf->CellFitScale(8,5," ".$d["unit"],1, 0, 'L', 0);
			$pdf->CellFitScale(20,5," ".$d["current_price"],1, 0, 'L', 0);
			$pdf->CellFitScale(12,5," ".$d["quantity"],1, 0, 'L', 0);

		
			$i++;
		}
		
		

		$filename = "../pdf/inventoryRecords.pdf";
		$pdf->Output($filename,'F');

	}

?>