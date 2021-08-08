<?php

namespace App\Controllers;

use App\Models\PenyuluhModel;

class Home extends BaseController
{
	public function index()
	{
		$penyuluhModel = new PenyuluhModel();
		$penyuluh = $penyuluhModel->findAll();

		dd($penyuluh);

		$data = [
			'title' => 'Home',
			'users' => $users
		];

		return view('test_view', $data);
	}
}
