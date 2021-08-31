<?php

namespace App\Controllers\Penyuluh;

use App\Controllers\BaseController;

class PenyuluhTHLAPBN extends BaseController
{


    public function penyuluhthlAPBN()
    {

        $data = [
            'title' => 'Penyuluh THL APBN',
            'name' => 'THL APBN'
        ];

        return view('kab/penyuluh/penyuluhthlAPBN', $data);
    }
}
