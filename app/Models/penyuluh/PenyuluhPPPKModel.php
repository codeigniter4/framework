<?php

namespace App\Models\penyuluh;

use CodeIgniter\Model;
use \Config\Database;

class PenyuluhPPPKModel extends Model
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


    public function getPenyuluhPPPKTotal($kode_kab)
    {
        $db = Database::connect();
        $query = $db->query("select count(a.id) as jum, nama_dati2 as nama_kab from tbldasar_p3k a left join tbldati2 b on b.id_dati2=a.satminkal where satminkal='$kode_kab'");
        $row   = $query->getRow();

        $query   = $db->query("select a.noktp, a.nip, a.nama, a.gelar_dpn, a.gelar_blk, a.tgl_update, d.nm_desa, 
                                case a.kode_kab 
                                when '3' then 
                                    case a.unit_kerja 
                                    when '10' then 'Badan Pelaksana Penyuluhan Pertanian, Perikanan dan Kehutanan'
                                    when '20' then 'Badan Pelaksana Penyuluhan'
                                    when '31' then i.deskripsi_lembaga_lain
                                    when '32' then i.deskripsi_lembaga_lain
                                    when '33' then i.deskripsi_lembaga_lain
                                    else '' end
                                when '4' then k.nama_bpp 
                                else '' end nama_bapel, 
                                case a.status
                                when '0' then 'Aktif'
                                when '6' then 'Tugas Belajar'
                                else '' end status_kel,
                                case a.kode_kab when '3' then j.deskripsi when '4' then d.nm_desa else '' end as wilker,
                                case a.kode_kab when '3' then l.deskripsi when '4' then e.nm_desa else '' end as wilker2,
                                case a.kode_kab when '3' then m.deskripsi when '4' then f.nm_desa else '' end as wilker3,
                                case a.kode_kab when '3' then n.deskripsi when '4' then g.nm_desa else '' end as wilker4,
                                case a.kode_kab when '3' then o.deskripsi when '4' then h.nm_desa else '' end as wilker5,
                                case a.kode_kab when '3' then p.deskripsi when '4' then u.nm_desa else '' end as wilker6,
                                case a.kode_kab when '3' then q.deskripsi when '4' then v.nm_desa else '' end as wilker7,
                                case a.kode_kab when '3' then r.deskripsi when '4' then w.nm_desa else '' end as wilker8,
                                case a.kode_kab when '3' then s.deskripsi when '4' then x.nm_desa else '' end as wilker9,
                                case a.kode_kab when '3' then t.deskripsi when '4' then y.nm_desa else '' end as wilker10,
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
                                left join tblbapel i on a.kode_kab='3' and a.satminkal=i.kabupaten and a.unit_kerja=i.nama_bapel
                                left join tblbpp k on a.kode_kab='4' and a.unit_kerja=k.id
                                left join tbldaerah j on a.kecamatan_tugas=j.id_daerah
                                left join tbldaerah l on a.kecamatan_tugas2=l.id_daerah
                                left join tbldaerah m on a.kecamatan_tugas3=m.id_daerah
                                left join tbldaerah n on a.kecamatan_tugas4=n.id_daerah
                                left join tbldaerah o on a.kecamatan_tugas5=o.id_daerah
                                left join tbldaerah p on a.kecamatan_tugas6=p.id_daerah
                                left join tbldaerah q on a.kecamatan_tugas7=q.id_daerah
                                left join tbldaerah r on a.kecamatan_tugas8=r.id_daerah
                                left join tbldaerah s on a.kecamatan_tugas9=s.id_daerah
                                left join tbldaerah t on a.kecamatan_tugas10=t.id_daerah
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
