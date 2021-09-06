<?php

namespace App\Controllers\KelembagaanPenyuluhan\Kabupaten;

use App\Controllers\BaseController;
use App\Models\KelembagaanPenyuluhan\Kabupaten\KabupatenModel;

class Kabupaten extends BaseController
{
    public function kab()
    {
        $get_param = $this->request->getGet();

        $kode_kab = $get_param['kode_kab'];
        $kab_model = new KabupatenModel;
        $kab_data = $kab_model->getKabTotal($kode_kab);

        $data = [
            //'jum_des' => $desa_data['jum_des'],
            'nama_kabupaten' => $kab_data['nama_kab'],
            'tabel_data' => $kab_data['table_data'],
            'title' => 'Kabupaten',
            'name' => 'Kabupaten'
        ];

        return view('KelembagaanPenyuluhan/Kabupaten/kabupaten', $data);
    }

    // public function listdesa()
    // {

    //     $data = [


    //         'name' => 'Desa'
    //     ];
    //     return view('KelembagaanPenyuluhan/Desa/listdesa', $data);
    // }
}
