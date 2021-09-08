<?php

namespace App\Controllers\KelembagaanPelakuUtama\Gapoktan;
use App\Controllers\BaseController;
use App\Models\KelembagaanPelakuUtama\Gapoktan\ListGapoktanModel;

class ListGapoktan extends BaseController
{
    public function listgapoktan()
    {
        $get_param = $this->request->getGet();

        $kode_kec = $get_param['kode_kec'];
        $listgapoktan_model = new ListGapoktanModel();
        $listgapoktan_data = $listgapoktan_model->getListGapoktanTotal($kode_kec);

        $data = [
            
            'nama_kecamatan' => $listgapoktan_data['nama_kec'],
            'jum' => $listgapoktan_data['jum'],
          //  'jumpok' => $listgapoktan_data['jumpok'],
            'tabel_data' => $listgapoktan_data['table_data'],
            'title' => 'List Gabungan Kelompok Tani',
            'name' => 'List Gabungan Kelompok Tani'
        ];

        return view('KelembagaanPelakuUtama/Gapoktan/listgapoktan', $data);
    }
  
}