<?php

namespace App\Controllers\Penyuluh;

use App\Controllers\BaseController;
use App\Models\penyuluh\PenyuluhCPNSModel;

class PenyuluhCpns extends BaseController
{


    public function penyuluhcpns()
    {

        $get_param = $this->request->getGet();

        $kode_kab = $get_param['kode_kab'];
        $penyuluh_model = new PenyuluhCPNSModel();
        $cpns_data = $penyuluh_model->getPenyuluhCPNSTotal($kode_kab);

        $data = [
            'jml_data' => $cpns_data['jum'],
            'nama_kabupaten' => $cpns_data['nama_kab'],
            'tabel_data' => $cpns_data['table_data'],
            'title' => 'Penyuluh CPNS',
            'name' => 'CPNS'
        ];

        return view('kab/penyuluh/penyuluhcpns', $data);
    }
}
