<?php

namespace App\Models\penyuluh;

use CodeIgniter\Model;
use \Config\Database;

class PenyuluhTHLAPBDKecModel extends Model
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


    public function getPenyuluhTHLAPBDKecTotal($kode_kec)
    {
        $db = Database::connect();
        $query = $db->query("select count(a.id) as jum, nama_dati2 as nama_kab, deskripsi as nama_kec from tbldasar_thl a 
        left join tbldati2 b on b.id_dati2=a.satminkal 
        left join tbldaerah c on c.id_daerah=a.tempat_tugas
        where tempat_tugas='$kode_kec' and sumber_dana='apbd'");
        $row   = $query->getRow();

        $query   = $db->query("select a.no_peserta, a.nama, a.tgl_update, d.nm_desa as wil_kerja, e.nm_desa as wil_kerja2,
        f.nm_desa as wil_kerja3, g.nm_desa as wil_kerja4, h.nm_desa as wil_kerja5, u.nm_desa as wil_kerja6, v.nm_desa as wil_kerja7,
        w.nm_desa as wil_kerja8, x.nm_desa as wil_kerja9, y.nm_desa as wil_kerja10, 
        j.deskripsi as kecamatan_tugas, k.nama_bpp
                                from tbldasar_thl a
                                left join tblsatminkal b on a.satminkal=b.kode
                                left join tblstatus_penyuluh c on a.status_kel=c.kode
                                left join tbldesa d on a.wil_kerja=d.id_desa
                                left join tbldesa e on a.wil_kerja2=e.id_desa
                                left join tbldesa f on a.wil_kerja3=f.id_desa
                                left join tbldesa g on a.wil_kerja4=g.id_desa
                                left join tbldesa h on a.wil_kerja5=h.id_desa
                                left join tbldesa u on a.wil_kerja6=u.id_desa
                                left join tbldesa v on a.wil_kerja7=v.id_desa
                                left join tbldesa w on a.wil_kerja8=w.id_desa
                                left join tbldesa x on a.wil_kerja9=x.id_desa
                                left join tbldesa y on a.wil_kerja10=y.id_desa
                                left join tblbpp k on a.unit_kerja=k.id
                                left join tbldaerah j on a.kecamatan_tugas=j.id_daerah
                                where a.tempat_tugas='$kode_kec' and sumber_dana='apbd' order by nama");
        $results = $query->getResultArray();

        $data =  [
            'jum' => $row->jum,
            'nama_kab' => $row->nama_kab,
            'nama_kec' => $row->nama_kec,
            'table_data' => $results,
        ];

        return $data;
    }
}
