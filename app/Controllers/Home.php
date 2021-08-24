<?php

namespace App\Controllers;

use App\Models\PenyuluhModel;

class Home extends BaseController
{
	public function index()
	{
		$penyuluhModel = new PenyuluhModel();
		$penyuluh = $penyuluhModel->findAll();

		//dd($penyuluh);

		$data = [
			'title' => 'Home',
			'dt' => $penyuluh
		];

		return view('welcome_message', $data);
	}
}
