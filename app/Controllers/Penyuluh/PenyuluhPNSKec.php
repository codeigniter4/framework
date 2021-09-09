<?php

namespace App\Controllers\Penyuluh;

use App\Controllers\BaseController;
use App\Models\penyuluh\PenyuluhPNSKecModel;

class PenyuluhPNSKec extends BaseController
{


    public function penyuluhpnskec()
    {
        $get_param = $this->request->getGet();

        $kode_kec = $get_param['kode_kec'];
        // $kode_kab = $get_param['kode_kab'];
        $penyuluh_model = new PenyuluhPNSKecModel();
        $pnskec_data = $penyuluh_model->getPenyuluhPNSKecTotal($kode_kec);

        $data = [
            'jml_data' => $pnskec_data['jum'],
            // 'nama_kabupaten' => $pnskec_data['nama_kab'],
            'nama_kecamatan' => $pnskec_data['nama_kec'],
            'tabel_data' => $pnskec_data['table_data'],
            'title' => 'Penyuluh PNS',
            'name' => 'PNS'
        ];

        // var_dump($data);
        // die();

        return view('kab/penyuluh/penyuluhpnskec', $data);
    }
}
