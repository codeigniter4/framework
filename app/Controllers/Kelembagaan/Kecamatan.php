<?php

namespace App\Controllers\Kelembagaan;

use App\Controllers\BaseController;

class Kecamatan extends BaseController
{
    public function index()
    {
        $data = [
            'title' => 'Kecamatan'
        ];

        return view('kelembagaan/kecamatan', $data);
    }
}
