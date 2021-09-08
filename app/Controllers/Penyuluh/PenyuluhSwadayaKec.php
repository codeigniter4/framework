<?php

namespace App\Controllers\Penyuluh;

use App\Controllers\BaseController;
use App\Models\penyuluh\PenyuluhSwadayaKecModel;

class PenyuluhSwadayaKec extends BaseController
{


    public function penyuluhswadayakec()
    {
        $get_param = $this->request->getGet();

        $kode_kec = $get_param['kode_kec'];
        // $kode_kab = $get_param['kode_kab'];
        $penyuluh_model = new PenyuluhSwadayaKecModel();
        $swadayakec_data = $penyuluh_model->getPenyuluhSwadayaKecTotal($kode_kec);

        $data = [
            'jml_data' => $swadayakec_data['jum'],
            // 'nama_kabupaten' => $swadayakec_data['nama_kab'],
            'nama_kecamatan' => $swadayakec_data['nama_kec'],
            'tabel_data' => $swadayakec_data['table_data'],
            'title' => 'Penyuluh Swadaya',
            'name' => 'Swadaya'
        ];

        // var_dump($data);
        // die();

        return view('kab/penyuluh/penyuluhswadayakec', $data);
    }
}
