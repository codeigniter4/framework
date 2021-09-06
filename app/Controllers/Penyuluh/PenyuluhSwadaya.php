<?php

namespace App\Controllers\Penyuluh;

use App\Controllers\BaseController;
use App\Models\PenyuluhModel;
use App\Models\penyuluh\PenyuluhSwadayaModel;

class PenyuluhSwadaya extends BaseController
{


    public function penyuluhswadaya()
    {
        $get_param = $this->request->getGet();

        $kode_kab = $get_param['kode_kab'];
        $penyuluh_model = new PenyuluhSwadayaModel();
        $swadaya_data = $penyuluh_model->getPenyuluhSwadayaTotal($kode_kab);

        $data = [
            'jml_data' => $swadaya_data['jum'],
            'nama_kabupaten' => $swadaya_data['nama_kab'],
            'tabel_data' => $swadaya_data['table_data'],
            'title' => 'Penyuluh Swadaya',
            'name' => 'Swadaya'
        ];

        // var_dump($data);
        // die();

        return view('kab/penyuluh/penyuluhswadaya', $data);
    }
}
