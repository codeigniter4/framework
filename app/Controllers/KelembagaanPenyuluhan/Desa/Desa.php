<?php

namespace App\Controllers\KelembagaanPenyuluhan\Desa;
use App\Controllers\BaseController;
use App\Models\KelembagaanPenyuluhan\Desa\DesaModel;

class Desa extends BaseController
{
    public function desa()
    {
        $get_param = $this->request->getGet();

        $kode_kab = $get_param['kode_kab'];
        $desa_model = new DesaModel;
        $desa_data = $desa_model->getDesaTotal($kode_kab);

        $data = [
            'jum_des' => $desa_data['jum_des'],
            'nama_kabupaten' => $desa_data['nama_kab'],
            'tabel_data' => $desa_data['table_data'],
            'title' => 'Desa',
            'name' => 'Desa'
        ];

        return view('KelembagaanPenyuluhan/Desa/desa', $data);
    }
  
    public function listdesa()
    {
     
        $data = [
            
           
            'name' => 'Desa'
        ];
        return view('KelembagaanPenyuluhan/Desa/listdesa', $data);
    }
}