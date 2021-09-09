<?php

namespace App\Controllers\Penyuluh;

use App\Controllers\BaseController;
use App\Models\penyuluh\PenyuluhTHLAPBNKecModel;

class PenyuluhTHLAPBNKec extends BaseController
{


    public function penyuluhthlAPBNKec()
    {

        $get_param = $this->request->getGet();

        // $kode_kab = $get_param['kode_kab'];
        $kode_kec = $get_param['kode_kec'];
        $penyuluh_model = new PenyuluhTHLAPBNKecModel();
        $thlapbn_data = $penyuluh_model->getPenyuluhTHLAPBNKecTotal($kode_kec);

        $data = [
            'jml_data' => $thlapbn_data['jum'],
            'nama_kabupaten' => $thlapbn_data['nama_kab'],
            'nama_kecamatan' => $thlapbn_data['nama_kec'],
            'tabel_data' => $thlapbn_data['table_data'],
            'title' => 'Penyuluh THL APBN',
            'name' => 'THL APBN'
        ];

        return view('kab/penyuluh/penyuluhthlAPBNkec', $data);
    }
}
