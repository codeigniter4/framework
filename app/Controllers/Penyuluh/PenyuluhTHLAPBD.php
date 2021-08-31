<?php

namespace App\Controllers\Penyuluh;

use App\Controllers\BaseController;

class PenyuluhTHLAPBD extends BaseController
{


    public function penyuluhthlAPBD()
    {

        $data = [
            'title' => 'Penyuluh THL APBD',
            'name' => 'THL APBD'
        ];

        return view('kab/penyuluh/penyuluhthlAPBD', $data);
    }
}
