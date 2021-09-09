<?php

namespace App\Controllers\KelembagaanPenyuluhan\Kecamatan;

use App\Controllers\BaseController;
use App\Models\KelembagaanPenyuluhan\Kecamatan\KecamatanModel;

class Kecamatan extends BaseController
{
    public function kecamatan()
    {
        $get_param = $this->request->getGet();

        $kode_kab = $get_param['kode_kab'];
        $kec_model = new KecamatanModel;
        $kec_data = $kec_model->getKecTotal($kode_kab);

        $data = [

            //'jumpns' => $kec_data['jumpns'],
            'nama_kabupaten' => $kec_data['nama_kab'],
            'tabel_data' => $kec_data['table_data'],
            'title' => 'Kecamatan',
            'name' => 'Kecamatan'

        ];

        return view('KelembagaanPenyuluhan/Kecamatan/kecamatan', $data);
    }

    // public function listdesa()
    // {

    //     $data = [


    //         'name' => 'Desa'
    //     ];
    //     return view('KelembagaanPenyuluhan/Desa/listdesa', $data);
    // }

}

