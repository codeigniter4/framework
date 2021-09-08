<?php

namespace App\Models\penyuluh;

use CodeIgniter\Model;
use \Config\Database;

class PenyuluhSwadayaKecModel extends Model
{
    protected $table      = 'simluhtan';
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


    public function getPenyuluhSwadayaKecTotal($kode_kec)
    {
        $db = Database::connect();
        $query = $db->query("select count(a.id_swa) as jum, nama_dati2 as nama_kab, deskripsi as nama_kec from tbldasar_swa a 
        left join tbldati2 b on b.id_dati2=a.satminkal
        left join tbldaerah c on c.id_daerah=a.tempat_tugas
        where a.tempat_tugas='$kode_kec'");
        $row   = $query->getRow();

        $query   = $db->query("select a.noktp, a.nama, a.tgl_update, d.nm_desa as wil_ker, e.nm_desa as wil_ker2, 
                                f.nm_desa as wil_ker3, g.nm_desa as wil_ker4, h.nm_desa as wil_ker5, i.nama_bpp, 
                                j.deskripsi from tbldasar_swa a
                                left join tblsatminkal b on a.satminkal=b.kode
                                left join tblstatus_penyuluh c on a.status_kel=c.kode
                                left join tbldesa d on a.wil_kerja=d.id_desa
                                left join tbldesa e on a.wil_kerja2=e.id_desa
                                left join tbldesa f on a.wil_kerja3=f.id_desa
                                left join tbldesa g on a.wil_kerja4=g.id_desa
                                left join tbldesa h on a.wil_kerja5=h.id_desa
                                left join tblbpp i on a.unit_kerja=i.id
                                left join tbldaerah j on a.kecamatan_tugas=j.id_daerah
                                where a.tempat_tugas='$kode_kec' order by nama");
        $results = $query->getResultArray();

        $data =  [
            'jum' => $row->jum,
            'nama_kec' => $row->nama_kec,
            // 'nama_kab' => $row->nama_kab,
            'table_data' => $results,
        ];

        return $data;
    }
}
