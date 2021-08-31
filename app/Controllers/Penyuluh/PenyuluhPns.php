<?php

namespace App\Controllers\Penyuluh;

use App\Controllers\BaseController;

class PenyuluhPns extends BaseController
{


    public function penyuluhpns()
    {

        $data = [
            'title' => 'Penyuluh PNS',
            'name' => 'PNS'
        ];

        return view('kab/penyuluh/penyuluhpns', $data);
    }
}
