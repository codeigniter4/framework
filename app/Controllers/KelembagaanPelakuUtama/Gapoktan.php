<?php

namespace App\Controllers\KelembagaanPelakuUtama;
use App\Controllers\BaseController;
use App\Models\KelembagaanPelakuUtama\Gapoktan\GapoktanModel;

class Gapoktan extends BaseController
{
    public function gapoktan()
    {
        $get_param = $this->request->getGet();

        $kode_kab = $get_param['kode_kab'];
        $gapoktan_model = new GapoktanModel;
        $gapoktan_data = $gapoktan_model->getGapoktanTotal($kode_kab);

        $data = [
            
            'nama_kabupaten' => $gapoktan_data['nama_kab'],
            'jum_gapoktan' => $gapoktan_data['jum_gapoktan'],
            'tabel_data' => $gapoktan_data['table_data'],
            'title' => 'Gapoktan',
            'name' => 'Gapoktan'
        ];

        return view('KelembagaanPelakuUtama/Gapoktan/gapoktan', $data);
    }
  
    public function listgapoktan()
    {
        $get_param = $this->request->getGet();

        $kode_kec = $get_param['kode_kec'];
        $gapoktan_model = new GapoktanModel();
        $gapoktan_data = $gapoktan_model->getGapoktanTotal($kode_kec);

        $data = [
            
            'nama_kecamatan' => $gapoktan_data['nama_kec'],
            
            'tabel_data' => $gapoktan_data['table_data'],
            'title' => 'Gapoktan',
            'name' => 'Gapoktan'
        ];
        return view('KelembagaanPelakuUtama/Gapoktan/listgapoktan', $data);
    }
}