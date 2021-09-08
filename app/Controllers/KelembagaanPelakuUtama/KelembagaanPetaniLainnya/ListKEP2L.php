<?php

namespace App\Controllers\KelembagaanPelakuUtama\KelembagaanPetaniLainnya;
use App\Controllers\BaseController;
use App\Models\KelembagaanPelakuUtama\KelembagaanPetaniLainnya\ListKEP2LModel;

class ListKEP2L extends BaseController
{
    public function listkep2l()
    {
        $get_param = $this->request->getGet();

        $kode_kec = $get_param['kode_kec'];
        $listkep2l_model = new ListKEP2LModel();
        $listkep2l_data = $listkep2l_model->getListKEP2LTotal($kode_kec);

        $data = [
            
            'nama_kecamatan' => $listkep2l_data['nama_kec'],
            'jum' => $listkep2l_data['jum'],
            'tabel_data' => $listkep2l_data['table_data'],
            'title' => 'List Kelompok Petani Lainnya',
            'name' => 'List Kelompok Petani Lainnya'
        ];

        return view('KelembagaanPelakuUtama/KelembagaanPetaniLainnya/listkep2l', $data);
    }
  
   
}