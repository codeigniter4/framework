<?php

namespace App\Controllers\Penyuluh;

use App\Controllers\BaseController;
use App\Models\penyuluh\PenyuluhTHLAPBDKecModel;

class PenyuluhTHLAPBDKec extends BaseController
{


    public function penyuluhthlAPBDKec()
    {

        $get_param = $this->request->getGet();

        // $kode_kab = $get_param['kode_kab'];
        $kode_kec = $get_param['kode_kec'];
        $penyuluh_model = new PenyuluhTHLAPBDKecModel();
        $thlapbd_data = $penyuluh_model->getPenyuluhTHLAPBDKecTotal($kode_kec);

        $data = [
            'jml_data' => $thlapbd_data['jum'],
            'nama_kabupaten' => $thlapbd_data['nama_kab'],
            'nama_kecamatan' => $thlapbd_data['nama_kec'],
            'tabel_data' => $thlapbd_data['table_data'],
            'title' => 'Penyuluh THL APBD',
            'name' => 'THL APBD'
        ];

        return view('kab/penyuluh/penyuluhthlAPBDkec', $data);
    }
}
