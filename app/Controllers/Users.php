<?php namespace App\Controllers;
use App\Models\UserModel;
use App\Services\UserService;

class Users extends BaseController
{
	public function index()
	{
		$userService = new UserService();
		$request = $this->request;
		$response = $this->response;
		$method = $request->getMethod();
		$json = $request->getJSON();

		switch ($method) {
		    case 'post':
						$user = $userService->saveUser($json);
						return $response->setJSON($user);
		        break;
				case 'put':
		        $errResponse = $response->setStatusCode(404);
						return $response->setJSON($errResponse);
		        break;
		    case 'get':
						$users = $userService->getUsers();
						return $response->setJSON($users);
		        break;
		    default:
		        echo "string";;
		}
	}

	public function id($user_id)
	{
		$userService = new UserService();
		$request = $this->request;
		$response = $this->response;
		$method = $request->getMethod();
		$json = $request->getJSON();

		switch ($method) {
		    case 'post':
						$user = $userService->updateUserById($user_id, $json);
		        return $response->setJSON($user);
		        break;
		    case 'get':
						$user = $userService->getUser($user_id);
						return $response->setJSON($user);
		        break;
		    default:
		        echo "string";;
		}
	}

}
