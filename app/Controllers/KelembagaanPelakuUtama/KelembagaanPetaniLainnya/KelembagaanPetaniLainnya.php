<?php

namespace App\Controllers\KelembagaanPelakuUtama\KelembagaanPetaniLainnya;
use App\Controllers\BaseController;
use App\Models\KelembagaanPelakuUtama\KelembagaanPetaniLainnya\KelembagaanPetaniLainnyaModel;

class KelembagaanPetaniLainnya extends BaseController
{
    public function kelembagaanpetanilainnya()
    {
        $get_param = $this->request->getGet();

        $kode_kab = $get_param['kode_kab'];
        $kelembagaanpetanilainnya_model = new KelembagaanPetaniLainnyaModel();
        $kelembagaanpetanilainnya_data = $kelembagaanpetanilainnya_model->getKelembagaanPetaniLainnyaTotal($kode_kab);

        $data = [
            
            'nama_kabupaten' => $kelembagaanpetanilainnya_data['nama_kab'],
            'jum_poktan' => $kelembagaanpetanilainnya_data['jum_poktan'],
            'tabel_data' => $kelembagaanpetanilainnya_data['table_data'],
            'title' => 'Kelompok Petani Lainnya',
            'name' => 'Kelompok Petani Lainnya'
        ];

        return view('KelembagaanPelakuUtama/KelembagaanPetaniLainnya/kelembagaanpetanilainnya', $data);
    }
  
   
}