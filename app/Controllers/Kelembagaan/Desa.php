<?php

namespace App\Controllers\Kelembagaan;

use App\Controllers\BaseController;

class Desa extends BaseController
{
    public function index()
    {
        $data = [
            'title' => 'Desa'
        ];

        return view('kelembagaan/desa', $data);
    }
}
