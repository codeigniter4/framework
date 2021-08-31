<?php

namespace App\Controllers\Kelembagaan;

use App\Controllers\BaseController;

class KabupatenKota extends BaseController
{
    public function index()
    {
        $data = [
            'title' => 'kab/kota'
        ];

        return view('kelembagaan/KabupatenKota', $data);
    }
}
