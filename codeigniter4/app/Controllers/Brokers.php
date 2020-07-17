<?php namespace App\Controllers;
use App\Services\BrokerService;

class Brokers extends BaseController
{
	public function index()
	{
		$brokerService = new BrokerService();
		$request = $this->request;
		$response = $this->response;
		$method = $request->getMethod();
		$json = $request->getJSON();

		switch ($method) {
		    case 'post':
						$broker = $brokerService->saveBroker($json);
						return $response->setJSON($broker);
		        break;
		    case 'get':
						$brokers = $brokerService->getBrokers();
						return $response->setJSON($brokers);
		        break;
		    default:
		        echo "nothing here!";
		}
	}

	public function id($broker_id)
	{
		$brokerService = new BrokerService();
		$request = $this->request;
		$response = $this->response;
		$method = $request->getMethod();
		$json = $request->getJSON();

		switch ($method) {
		    case 'get':
						$broker = $brokerService->getBroker($broker_id);
						return $response->setJSON($broker);
		        break;
		    default:
		        echo "nothing here!";
		}
	}

}
