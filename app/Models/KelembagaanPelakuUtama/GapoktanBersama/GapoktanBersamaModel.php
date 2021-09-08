<?php

namespace App\Models\KelembagaanPelakuUtama\GapoktanBersama;

use CodeIgniter\Model;
use \Config\Database;

class GapoktanBersamaModel extends Model
{
    //protected $table      = 'penyuluh';
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


    public function getGapoktanBersamaTotal($kode_kab)
    {
        $db = Database::connect();
        $query = $db->query("select nama_dati2 as nama_kab from tbldati2 where id_dati2='$kode_kab'");
        $row   = $query->getRow();
        
        $query2 = $db->query("SELECT count(id_gapber) as jum FROM tb_gapoktan_bersama where kode_kab ='$kode_kab'");
        $row2   = $query2->getRow();
        
        $query3   = $db->query("select id_gapber,kode_desa,kode_kec,nama_gapoktan,ketua_gapoktan,simluh_bendahara,alamat, b.nm_desa 
                                from tb_gapoktan_bersama a
                                left join tbldesa b on a.kode_desa=b.id_desa 
                                where kode_kab='$kode_kab'          
                                order by kode_desa");
        $results = $query3->getResultArray();

        $data =  [
            'jum' => $row2->jum,
            'nama_kab' => $row->nama_kab,
            'table_data' => $results,
        ];

        return $data;
    }
}
