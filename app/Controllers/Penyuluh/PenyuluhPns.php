<?php

namespace App\Controllers\Penyuluh;

use App\Controllers\BaseController;
use App\Models\penyuluh\PenyuluhPNSModel;

class PenyuluhPns extends BaseController
{


    public function penyuluhpns()
    {

        $get_param = $this->request->getGet();

        $kode_kab = $get_param['kode_kab'];
        $penyuluh_model = new PenyuluhPNSModel();
        $pns_data = $penyuluh_model->getPenyuluhPNSTotal($kode_kab);

        $data = [
            'jml_data' => $pns_data['jum'],
            'nama_kabupaten' => $pns_data['nama_kab'],
            'tabel_data' => $pns_data['table_data'],
            'title' => 'Penyuluh PNS',
            'name' => 'PNS'
        ];

        return view('kab/penyuluh/penyuluhpns', $data);
    }
}
