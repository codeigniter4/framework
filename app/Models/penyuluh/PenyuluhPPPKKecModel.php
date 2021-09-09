<?php

namespace App\Models\penyuluh;

use CodeIgniter\Model;
use \Config\Database;

class PenyuluhPPPKKecModel extends Model
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


    public function getPenyuluhPPPKKecTotal($kode_kec)
    {
        $db = Database::connect();
        $query = $db->query("select count(a.id) as jum, nama_dati2 as nama_kab,  deskripsi as nama_kec from tbldasar_p3k a 
        left join tbldati2 b on b.id_dati2=a.satminkal 
        left join tbldaerah c on c.id_daerah=a.tempat_tugas
        where a.tempat_tugas='$kode_kec' and status !='1' and status !='2' and status !='3'");
        $row   = $query->getRow();

        $query   = $db->query("select a.noktp, a.nip, a.nama, a.gelar_dpn, a.gelar_blk, a.tgl_update, k.nama_bpp,
                                d.nm_desa as wil_kerja, e.nm_desa as wil_kerja2,
                                f.nm_desa as wil_kerja3, g.nm_desa as wil_kerja4, h.nm_desa as wil_kerja5, 
                                u.nm_desa as wil_kerja6, v.nm_desa as wil_kerja7,
                                w.nm_desa as wil_kerja8, x.nm_desa as wil_kerja9, y.nm_desa as wil_kerja10,
                                case a.status
                                when '0' then 'Aktif'
                                when '6' then 'Tugas Belajar'
                                else '' end status_kel,
                                j.deskripsi as kecamatan_tugas
                                from tbldasar_p3k a
                                left join tblsatminkal b on a.satminkal=b.kode
                                left join tblstatus_penyuluh c on a.status='0' and a.status_kel=c.kode
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
                                where a.tempat_tugas='$kode_kec' and status !='1' and status !='2' and status !='3' order by nama");
        $results = $query->getResultArray();

        $data =  [
            'jum' => $row->jum,
            'nama_kec' => $row->nama_kec,
            'nama_kab' => $row->nama_kab,
            'table_data' => $results,
        ];

        return $data;
    }
}
