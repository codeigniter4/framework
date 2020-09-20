<?php namespace App\Controllers;
use App\Services\InvoiceService;

class Utils extends BaseController
{
	public function index()
 {
	echo 'Hello';
 }

 public function export()
 {
	 $Service = new InvoiceService();
	 $request = $this->request;
	 $response = $this->response;
	 $method = $request->getMethod();
	 $json = $request->getJSON();


	 function getheaders($json) {
		 $headers = array();
		 foreach ($json as $key => $value)
		 {
			 foreach ($json[$key] as $k => $v) {
				 if(in_array($k, $headers) == 0) {
					 array_push($headers, $k);
				 }

			 }
		 }
		 return $headers;
	 }

	 function getRows($json) {
		 $rows = array();
			foreach ($json as $key => $value)
	 		 {
				 $row = array();
	 			 foreach ($json[$key] as $k => $v)
	 			 {
					 // echo $v;
					 	array_push($rows, $v);
	 			 }
	 		 }

		 return $rows;
	 }


		switch ($method) {
			case 'post':
					$file_name = 'invoice_'.date('Ymd').'.csv';
					header("Content-Description: File Transfer");
					header("Content-Disposition: attachment; filename=$file_name");
					header("Content-Type: application/csv;");

					$file = fopen('php://output', 'w');

					$headers = getheaders($json);
					$rows = getRows($json);

					fputcsv($file, $headers);
					fputcsv($file, $rows);
					fclose($file);
					exit;
					break;
			default:
					echo "nothing here!";
		}
 }

	//--------------------------------------------------------------------

}
