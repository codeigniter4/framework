<?php namespace App\Controllers;
use App\Services\LoadService;

class Loads extends BaseController
{
	public function index()
	{
		$Service = new LoadService();
		$request = $this->request;
		$response = $this->response;
		$method = $request->getMethod();
		$json = $request->getJSON();

		switch ($method) {
		    case 'post':
						$record = $Service->saveRecord($json);
						return $response->setJSON($record);
		        break;
		    case 'get':
						$records = $Service->getRecords();
						return $response->setJSON($records);
		        break;
		    default:
		        echo "nothing here!";
		}
	}

	public function id($id)
	{
		$Service = new LoadService();
		$request = $this->request;
		$response = $this->response;
		$method = $request->getMethod();
		$json = $request->getJSON();

		switch ($method) {
		    case 'get':
						$record = $Service->getRecord($id);
						return $response->setJSON($record);
		        break;
		    default:
		        echo "nothing here!";
		}
	}

	public function delete($id)
	{
		$Service = new LoadService();
		$request = $this->request;
		$response = $this->response;
		$method = $request->getMethod();

		switch ($method) {
				case 'post':
						$record = $Service->deleteRecordById($id);
						return $response->setJSON($record);
						break;
				default:
						echo "nothing here!";
		}
	}

	public function getRecordByDate()
	{
		$Service = new LoadService();
		$request = $this->request;
		$response = $this->response;
		$method = $request->getMethod();

		switch ($method) {
				case 'get':
						$record = $Service->getRecordByDate();
						return $response->setJSON($record);
						break;
				default:
						echo "nothing here!";
		}
	}

}
