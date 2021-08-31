<?php

namespace App\Controllers\Penyuluh;

use App\Controllers\BaseController;

class PenyuluhCpns extends BaseController
{


    public function penyuluhcpns()
    {

        $data = [
            'title' => 'Penyuluh CPNS',
            'name' => 'CPNS'
        ];

        return view('kab/penyuluh/penyuluhcpns', $data);
    }
}
