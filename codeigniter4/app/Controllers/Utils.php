<?php namespace App\Controllers;
use App\Services\InvoiceService;

class Utils extends BaseController
{
	public function index()
 {
	echo 'nothing here!';
 }

 public function export()
 {
	 $Service = new InvoiceService();
	 $request = $this->request;
	 $response = $this->response;
	 $method = $request->getMethod();
	 $json = $request->getJSON();


	 function getData($json) {

		 $headers = array();
		 $rows = array();
		 foreach ($json as $key => $value)
		 {
			 $row = array();
			 foreach ($json[$key] as $k => $v) {
				 if(in_array($k, $headers) == 0) {
					 array_push($headers, $k);
				 }
				 array_push($row, $v);

			 }
			 array_push($rows, $row);
		 }


		 $data = (object) [
		    'headers' => $headers,
		    'rows' => $rows,
		  ];

		 return $data;
	 }


		switch ($method) {
			case 'post':
					$file_name = 'invoice_'.date('Ymd').'.csv';
					header("Content-Description: File Transfer");
					header("Content-Disposition: attachment; filename=$file_name");
					header("Content-Type: application/csv;");

					$file = fopen('php://output', 'w');

					$data = getData($json);
					$headers = $data->headers;
					$rows = $data->rows;

					fputcsv($file, $headers);
					foreach ($rows as $key => $value)
		 		 	{
						fputcsv($file, $value);
					}


					fclose($file);
					exit;
					break;
			default:
					echo "nothing here!";
		}
 }

 function upload($id) {
		$request = $this->request;
		$response = $this->response;
		$method = $request->getMethod();
		$file = $request->getFile('file');
		$json = $request->getJSON();

		switch ($method) {
		case 'get':
			 return view('demos/uploads/index');
			 break;
		case 'post':
				 if ($file->isValid() && ! $file->hasMoved())
			      {
			          $file->move(WRITEPATH . 'uploads/'.$id);
								return $response->setJSON($json);
			      }
			 break;
		default:
			 echo "nothing here!";
		}
	}

}
