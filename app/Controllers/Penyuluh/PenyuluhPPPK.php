<?php

namespace App\Controllers\Penyuluh;

use App\Controllers\BaseController;
use App\Models\penyuluh\PenyuluhPPPKModel;

class PenyuluhPPPK extends BaseController
{


    public function penyuluhpppk()
    {

        $get_param = $this->request->getGet();

        $kode_kab = $get_param['kode_kab'];
        $penyuluh_model = new PenyuluhPPPKModel();
        $pppk_data = $penyuluh_model->getPenyuluhPPPKTotal($kode_kab);

        $data = [
            'jml_data' => $pppk_data['jum'],
            'nama_kabupaten' => $pppk_data['nama_kab'],
            'tabel_data' => $pppk_data['table_data'],
            'title' => 'Penyuluh PPPK',
            'name' => 'PPPK'
        ];

        return view('kab/penyuluh/penyuluhpppk', $data);
    }
}
