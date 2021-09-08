<?php

namespace App\Controllers\Penyuluh;

use App\Controllers\BaseController;
use App\Models\penyuluh\PenyuluhPPPKKecModel;

class PenyuluhPPPKKec extends BaseController
{


    public function penyuluhpppkkec()
    {
        $get_param = $this->request->getGet();

        $kode_kec = $get_param['kode_kec'];
        // $kode_kab = $get_param['kode_kab'];
        $penyuluh_model = new PenyuluhPPPKKecModel();
        $pppkkec_data = $penyuluh_model->getPenyuluhPPPKKecTotal($kode_kec);

        $data = [
            'jml_data' => $pppkkec_data['jum'],
            // 'nama_kabupaten' => $pppkkec_data['nama_kab'],
            'nama_kecamatan' => $pppkkec_data['nama_kec'],
            'tabel_data' => $pppkkec_data['table_data'],
            'title' => 'Penyuluh PNS',
            'name' => 'PNS'
        ];

        // var_dump($data);
        // die();

        return view('kab/penyuluh/penyuluhpppkkec', $data);
    }
}
