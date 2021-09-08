<?php

namespace App\Controllers\KelembagaanPelakuUtama\KelompokTani;
use App\Controllers\BaseController;
use App\Models\KelembagaanPelakuUtama\KelompokTani\ListPoktanAnggotaModel;

class ListPoktanAnggota extends BaseController
{
    public function listpoktananggota()
    {
        $get_param = $this->request->getGet();

        $ip = $get_param['ip'];
        $listpoktananggota_model = new ListPoktanAnggotaModel();
        $listpoktananggota_data = $listpoktananggota_model->getListPoktanAnggotaTotal($ip);

        $data = [
            
            'nama_poktan' => $listpoktananggota_data['nama_poktan'],
            'tabel_data' => $listpoktananggota_data['table_data'],
            'title' => 'List Kelompok Tani',
            'name' => 'List Kelompok Tani'
        ];

        return view('KelembagaanPelakuUtama/KelompokTani/listpoktananggota', $data);
    }
  
}