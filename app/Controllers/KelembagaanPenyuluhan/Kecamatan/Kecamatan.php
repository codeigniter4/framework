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
            //'jum_des' => $desa_data['jum_des'],
            'nama_kabupaten' => $kec_data['nama_kab'],
            'tabel_data' => $kec_data['table_data'],
            'title' => 'Kabupaten',
            'name' => 'Kabupaten'
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
