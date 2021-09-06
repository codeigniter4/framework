<?php

namespace App\Controllers\Penyuluh;

use App\Controllers\BaseController;
use App\Models\penyuluh\PenyuluhTHLAPBDModel;

class PenyuluhTHLAPBD extends BaseController
{


    public function penyuluhthlAPBD()
    {

        $get_param = $this->request->getGet();

        $kode_kab = $get_param['kode_kab'];
        $penyuluh_model = new PenyuluhTHLAPBDModel();
        $thlapbd_data = $penyuluh_model->getPenyuluhTHLAPBDTotal($kode_kab);

        $data = [
            'jml_data' => $thlapbd_data['jum'],
            'nama_kabupaten' => $thlapbd_data['nama_kab'],
            'tabel_data' => $thlapbd_data['table_data'],
            'title' => 'Penyuluh THL APBD',
            'name' => 'THL APBD'
        ];

        return view('kab/penyuluh/penyuluhthlAPBD', $data);
    }
}
