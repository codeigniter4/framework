<?php namespace App\Controllers;
use App\Models\UserModel;
use App\Services\UserService;






class Users extends BaseController
{
	public function index()
	{
		$userModel = new UserModel();
		$users = $userModel->findAll();
		echo json_encode($users);
	}

	public function getById($user_id)
	{
		$userModel = new UserModel();
		$method = $this->request->getMethod();

		switch ($method) {
		    case 'post':
						// $data = [
						// 	'name' => 'dc2dwwef',
						// 	'email'=> 'd.vader@theempire.com'
						// ];

						$userModel->update($user_id, $data);
		        echo json_encode($method);
		        break;
		    case 'get':
		        echo json_encode($method);
		        break;
		    default:
		        echo "string";;
		}
	}

}
