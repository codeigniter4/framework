<?php

namespace App\Controllers\Penyuluh;

use App\Controllers\BaseController;
use App\Models\PenyuluhPPPKModel;

class PenyuluhPPPK extends BaseController
{


    public function penyuluhpppk()
    {

        $get_param = $this->request->getGet();

        $kode_kab = $get_param['kode_kab'];
        $penyuluh_model = new PenyuluhPPPKModel();
        $swadaya_data = $penyuluh_model->getPenyuluhSwadayaTotal($kode_kab);

        $data = [
            'jml_data' => $swadaya_data['jum'],
            'nama_kabupaten' => $swadaya_data['nama_kab'],
            'tabel_data' => $swadaya_data['table_data'],
            'title' => 'Penyuluh Swadaya',
            'name' => 'Swadaya'
        ];

        return view('kab/penyuluh/penyuluhpppk', $data);
    }
}
