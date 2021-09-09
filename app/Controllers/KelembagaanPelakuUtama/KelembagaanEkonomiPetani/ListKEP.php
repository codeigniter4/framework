<?php

namespace App\Controllers\KelembagaanPelakuUtama\kelembagaanekonomipetani;
use App\Controllers\BaseController;
use App\Models\KelembagaanPelakuUtama\KelembagaanEkonomiPetani\ListKEPModel;

class ListKEP extends BaseController
{
    public function listkep()
    {
        $get_param = $this->request->getGet();

        $kode_kec = $get_param['kode_kec'];
        $listkep_model = new ListKEPModel();
        $listkep_data = $listkep_model->getListKEPTotal($kode_kec);

        $data = [
            
            'nama_kecamatan' => $listkep_data['nama_kec'],
            'tabel_data' => $listkep_data['table_data'],
            'title' => 'List Kelembagaan Ekonomi Petani',
            'name' => 'List Kelembagaan Ekonomi Petani'
        ];

        return view('KelembagaanPelakuUtama/KelembagaanEkonomiPetani/listkep', $data);
    }
  
   
}