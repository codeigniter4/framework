<?php namespace App\Controllers;
use App\Services\TableService;

class Table extends BaseController
{
	public function index()
	{

		echo "nothing here!";
	}

  public function create($tableName)
	{
		$tableService = new TableService();
		$request = $this->request;
		$response = $this->response;
		$method = $request->getMethod();
		$json = $request->getJSON();

		switch ($method) {
		    case 'post':
						$table = $tableService->createTable($tableName, $json);
						return $response->setJSON($table);
		        break;
		    default:
		        echo "nothing here!";
		}
	}
}
