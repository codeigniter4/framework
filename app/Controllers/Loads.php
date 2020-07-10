<?php namespace App\Controllers;
use App\Models\LoadModel;

class Loads extends BaseController
{
	public function index()
	{
		$loadModel = new LoadModel();
		$loads = $loadModel->findAll();
		echo json_encode($loads);
	}

	public function getById($load_id)
	{
		$loadModel = new LoadModel();
		$loads = $loadModel->find($load_id);
		echo json_encode($loads);
	}

}
