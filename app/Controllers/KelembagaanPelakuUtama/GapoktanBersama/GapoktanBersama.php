<?php

namespace App\Controllers\KelembagaanPelakuUtama\GapoktanBersama;
use App\Controllers\BaseController;
use App\Models\KelembagaanPelakuUtama\GapoktanBersama\GapoktanBersamaModel;

class GapoktanBersama extends BaseController
{
    public function gapoktanbersama()
    {
        $get_param = $this->request->getGet();

        $kode_kab = $get_param['kode_kab'];
        $gapoktanbersama_model = new GapoktanBersamaModel;
        $gapoktanbersama_data = $gapoktanbersama_model->getGapoktanBersamaTotal($kode_kab);

        $data = [
            
            'nama_kabupaten' => $gapoktanbersama_data['nama_kab'],
            'jum' => $gapoktanbersama_data['jum'],
            'tabel_data' => $gapoktanbersama_data['table_data'],
            'title' => 'Gapoktan Bersama',
            'name' => 'Gapoktan Bersama'
        ];

        return view('KelembagaanPelakuUtama/GapoktanBersama/gapoktanbersama', $data);
    }
  
    
}