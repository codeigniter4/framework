<?php

namespace App\Models\penyuluh;

use CodeIgniter\Model;
use \Config\Database;

class PenyuluhSwastaKecModel extends Model
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


    public function getPenyuluhSwastaKecTotal($kode_kec)
    {
        $db = Database::connect();
        $query = $db->query("select count(a.id_swa) as jum, nama_dati2 as nama_kab, deskripsi as nama_kec from tbldasar_swasta a 
        left join tbldati2 b on b.id_dati2=a.satminkal
        left join tbldaerah c on c.id_daerah=a.tempat_tugas
        where a.tempat_tugas='$kode_kec'");
        $row   = $query->getRow();

        $query   = $db->query("select a.noktp, a.nama, a.tgl_update, a.tempat_lahir, a.tgl_lahir, a.bln_lahir, a.thn_lahir, a.nama_perusahaan 
                                from tbldasar_swasta a
                                left join tblsatminkal b on a.satminkal=b.kode
                                where a.tempat_tugas='$kode_kec' order by nama");
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
