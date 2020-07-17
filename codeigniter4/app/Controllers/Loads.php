<?php namespace App\Controllers;
use App\Services\LoadService;

class Loads extends BaseController
{
	public function index()
	{
		$loadService = new LoadService();
		$request = $this->request;
		$response = $this->response;
		$method = $request->getMethod();
		$json = $request->getJSON();

		switch ($method) {
		    case 'post':
						$load = $loadService->saveLoad($json);
						return $response->setJSON($load);
		        break;
		    case 'get':
						$loads = $loadService->getLoads();
						return $response->setJSON($loads);
		        break;
		    default:
		        echo "nothing here!";
		}
	}

	public function id($load_id)
	{
		$loadService = new LoadService();
		$request = $this->request;
		$response = $this->response;
		$method = $request->getMethod();
		$json = $request->getJSON();

		switch ($method) {
		    case 'get':
						$load = $loadService->getload($load_id);
						return $response->setJSON($load);
		        break;
		    default:
		        echo "nothing here!";
		}
	}

	public function delete($load_id)
	{
		$loadService = new LoadService();
		$request = $this->request;
		$response = $this->response;
		$method = $request->getMethod();

		switch ($method) {
		    case 'post':
						$load = $loadService->deleteLoadById($load_id);
		        return $response->setJSON($load);
		        break;
		    default:
		        echo "nothing here!";
		}
	}

}
