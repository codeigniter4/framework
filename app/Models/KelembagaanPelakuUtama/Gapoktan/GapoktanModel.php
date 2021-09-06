<?php

namespace App\Models\KelembagaanPelakuUtama\Gapoktan;

use CodeIgniter\Model;
use \Config\Database;

class GapoktanModel extends Model
{
    protected $table      = 'penyuluh';
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


    public function getGapoktanTotal($kode_kab)
    {
        $db = Database::connect();
        $query = $db->query("select nama_dati2 as nama_kab from tbldati2 where id_dati2='$kode_kab'");
        $row   = $query->getRow();
        
        $query2 = $db->query("SELECT count(id_gap) as jum_gapoktan FROM tb_gapoktan where kode_kab ='$kode_kab'");
        $row2   = $query2->getRow();
        
        $query3   = $db->query("select id_daerah, deskripsi, count(id_gap) as jum 
                                from tbldaerah a
                                left join tb_gapoktan b on a.id_daerah=b.kode_kec and b.kode_kab='$kode_kab'
                                where id_dati2='$kode_kab'
                                group by id_daerah, deskripsi
                                order by deskripsi");
        $results = $query3->getResultArray();

        $data =  [
            'jum_gapoktan' => $row2->jum_gapoktan,
            'nama_kab' => $row->nama_kab,
            'table_data' => $results,
        ];

        return $data;
    }
}
