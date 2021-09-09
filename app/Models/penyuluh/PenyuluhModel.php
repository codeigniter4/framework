<?php

namespace App\Models\penyuluh;

use CodeIgniter\Model;
use \Config\Database;

class PenyuluhModel extends Model
{

    // protected $table      = 'simluhtan';
    // protected $table      = 'penyuluh';
    // protected $table      = 'tbljabatan';

    //protected $primaryKey = 'id';


    //protected $returnType     = 'array';
    //protected $useSoftDeletes = true;

    //protected $allowedFields = ['nama', 'alamat', 'telpon'];


    protected $useTimestamps = false;
    // protected $createdField  = 'created_at';
    // protected $updatedField  = 'updated_at';
    // protected $deletedField  = 'deleted_at';

    // protected $validationRules    = [];
    // protected $validationMessages = [];
    // protected $skipValidation     = false;


    public function getPenyuluhSwadayaTotal($kode_kab)
    {
        $db = Database::connect();
        $query = $db->query("select count(a.id) as jum, nama_dati2 as nama_kab from tbldasar_swa a left join tbldati2 b on b.id_dati2=a.satminkal where satminkal='$kode_kab'");
        $row   = $query->getRow();

        $query   = $db->query("select a.noktp, a.nama, a.tgl_update, d.nm_desa, i.nama_bpp, j.deskripsi from tbldasar_swa a
                                left join tblsatminkal b on a.satminkal=b.kode
                                left join tblstatus_penyuluh c on a.status_kel=c.kode
                                left join tbldesa d on a.wil_kerja=d.id_desa
                                left join tbldesa e on a.wil_kerja2=e.id_desa
                                left join tbldesa f on a.wil_kerja3=f.id_desa
                                left join tbldesa g on a.wil_kerja4=g.id_desa
                                left join tbldesa h on a.wil_kerja5=h.id_desa
                                left join tblbpp i on a.unit_kerja=i.id
                                left join tbldaerah j on a.kecamatan_tugas=j.id_daerah
                                where a.satminkal='$kode_kab' order by nama");
        $results = $query->getResultArray();

        $data =  [
            'jum' => $row->jum,
            'nama_kab' => $row->nama_kab,
            'table_data' => $results,
        ];

        return $data;
    }
}
