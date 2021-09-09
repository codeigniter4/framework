<?php

namespace App\Controllers\Penyuluh;

use App\Controllers\BaseController;
use App\Models\penyuluh\PenyuluhSwastaKecModel;

class PenyuluhSwastaKec extends BaseController
{


    public function penyuluhswastakec()
    {
        $get_param = $this->request->getGet();

        $kode_kec = $get_param['kode_kec'];
        // $kode_kab = $get_param['kode_kab'];
        $penyuluh_model = new PenyuluhSwastaKecModel();
        $swastakec_data = $penyuluh_model->getPenyuluhSwastaKecTotal($kode_kec);

        $data = [
            'jml_data' => $swastakec_data['jum'],
            // 'nama_kabupaten' => $swastakec_data['nama_kab'],
            'nama_kecamatan' => $swastakec_data['nama_kec'],
            'tabel_data' => $swastakec_data['table_data'],
            'title' => 'Penyuluh Swasta',
            'name' => 'Swasta'
        ];

        // var_dump($data);
        // die();

        return view('kab/penyuluh/penyuluhswastakec', $data);
    }
}
