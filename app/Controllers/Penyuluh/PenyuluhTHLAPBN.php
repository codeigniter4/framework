<?php

namespace App\Controllers\Penyuluh;

use App\Controllers\BaseController;
use App\Models\penyuluh\PenyuluhTHLAPBNModel;

class PenyuluhTHLAPBN extends BaseController
{


    public function penyuluhthlAPBN()
    {

        $get_param = $this->request->getGet();

        $kode_kab = $get_param['kode_kab'];
        $penyuluh_model = new PenyuluhTHLAPBNModel();
        $thlapbn_data = $penyuluh_model->getPenyuluhTHLAPBNTotal($kode_kab);

        $data = [
            'jml_data' => $thlapbn_data['jum'],
            'nama_kabupaten' => $thlapbn_data['nama_kab'],
            'tabel_data' => $thlapbn_data['table_data'],
            'title' => 'Penyuluh THL APBN',
            'name' => 'THL APBN'
        ];

        return view('kab/penyuluh/penyuluhthlAPBN', $data);
    }
}
