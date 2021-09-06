<?php

namespace App\Controllers\KelembagaanPelakuUtama\Gapoktan;
use App\Controllers\BaseController;
use App\Models\KelembagaanPelakuUtama\Gapoktan\ListGapoktanDesaModel;

class ListGapoktanDesa extends BaseController
{
    public function listgapoktandesa()
    {
        $get_param = $this->request->getGet();

        $kode_desa = $get_param['kode_desa'];
        $listgapoktandesa_model = new ListGapoktanDesaModel();
        $listgapoktandesa_data = $listgapoktandesa_model->getListGapoktanDesaTotal($kode_desa);

        $data = [
            
            'nama_desa' => $listgapoktandesa_data['nama_desa'],
            'tabel_data' => $listgapoktandesa_data['table_data'],
            'title' => 'List Gabungan Kelompok Tani',
            'name' => 'List Gabungan Kelompok Tani'
        ];

        return view('KelembagaanPelakuUtama/Gapoktan/listgapoktandesa', $data);
    }
  
}