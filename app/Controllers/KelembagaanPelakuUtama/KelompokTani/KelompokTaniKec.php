<?php

namespace App\Controllers\KelembagaanPelakuUtama\KelompokTani;
use App\Controllers\BaseController;
use App\Models\KelembagaanPelakuUtama\KelompokTani\KelompokTaniKecModel;

class KelompokTaniKec extends BaseController
{
    public function kelompoktanikec()
    {
        $get_param = $this->request->getGet();

        $nama_kec = $get_param['nama_kec'];
        $kelompoktanikec_model = new KelompokTaniKecModel();
        $kelompoktanikec_data = $kelompoktanikec_model->getKelompokTaniKecTotal($nama_kec);

        $data = [
            
            'nama_kec' => $kelompoktanikec_data['nama_kec'],
           // 'tabel_data' => $kelompoktanikec_data['table_data'],
            'title' => 'Kelompok Tani',
            'name' => 'Kelompok Tani'
        ];

        return view('KelembagaanPelakuUtama/KelompokTani/kelompoktanikec', $data);
    }
  
    
}