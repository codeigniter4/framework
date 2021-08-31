<?php

namespace App\Controllers\Kelembagaan;

use App\Controllers\BaseController;

class DaftarPosluhdes extends BaseController
{
    public function index()
    {
        $data = [
            'title' => 'Daftar Posluhdes'
        ];

        return view('kelembagaan/daftar_posluhdes', $data);
    }
}
