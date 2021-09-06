<?php

namespace App\Models\KelembagaanPelakuUtama\Gapoktan;

use CodeIgniter\Model;
use \Config\Database;

class ListGapoktanModel extends Model
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


    public function getListGapoktanTotal($kode_kec)
    {
        $db = Database::connect();
        $query = $db->query("select deskripsi as nama_kec from tbldaerah where id_daerah='$kode_kec'");
        $row   = $query->getRow();
        
        $query2 = $db->query("SELECT count(id_gap) as jum FROM tb_gapoktan where kode_kec ='$kode_kec'");
        $row2   = $query2->getRow();
        
        $query4   = $db->query("select id_gap,kode_desa,kode_kec,nama_gapoktan,ketua_gapoktan,simluh_bendahara,alamat, b.nm_desa 
                                from tb_gapoktan a
                                left join tbldesa b on a.kode_desa=b.id_desa 
                                
                                where kode_kec='$kode_kec'
                                ORDER BY kode_desa");

        $results = $query4->getResultArray();

      $query3 = $db->query("SELECT count(id_poktan) as jumpok FROM tb_poktan where id_gap ='id_gap'  and id_gap !=''");
       $row3   = $query3->getRow();

        

        $data =  [
            'jum' => $row2->jum,
            'nama_kec' => $row->nama_kec,
            'table_data' => $results,
            'jumpok' => $row3->jumpok,
            
        ];

        return $data;
    }
}
