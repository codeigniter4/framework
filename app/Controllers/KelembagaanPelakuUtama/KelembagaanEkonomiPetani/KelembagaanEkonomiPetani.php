<?php

namespace App\Controllers\KelembagaanPelakuUtama\KelembagaanEkonomiPetani;
use App\Controllers\BaseController;
use App\Models\KelembagaanPelakuUtama\KelembagaanEkonomiPetani\KelembagaanEkonomiPetaniModel;

class KelembagaanEkonomiPetani extends BaseController
{
    public function kelembagaanekonomipetani()
    {
        $get_param = $this->request->getGet();

        $kode_kab = $get_param['kode_kab'];
        $kelembagaanekonomipetani_model = new KelembagaanEkonomiPetaniModel();
        $kelembagaanekonomipetani_data = $kelembagaanekonomipetani_model->getKelembagaanEkonomiPetaniTotal($kode_kab);

        $data = [
            
            'nama_kabupaten' => $kelembagaanekonomipetani_data['nama_kab'],
            'tabel_data' => $kelembagaanekonomipetani_data['table_data'],
            'title' => 'Kelembagaan Ekonomi Petani',
            'name' => 'Kelembagaan Ekonomi Petani'
        ];

        return view('KelembagaanPelakuUtama/KelembagaanEkonomiPetani/kelembagaanekonomipetani', $data);
    }
  
   
}