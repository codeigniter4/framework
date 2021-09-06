<?php

namespace App\Models\KelembagaanPelakuUtama\Gapoktan;

use CodeIgniter\Model;
use \Config\Database;

class ListGapoktanDesaModel extends Model
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


    public function getListGapoktanDesaTotal($kode_desa)
    {
        $db = Database::connect();
        $query = $db->query("select nm_desa as nama_desa from tbldesa where id_desa='$kode_desa'");
        $row   = $query->getRow();
        
        $query2   = $db->query("select id_poktan,id_gap,kode_desa,kode_kec,nama_poktan,ketua_poktan,jum_anggota,alamat, b.nm_desa
                                from tb_poktan a
                                left join tbldesa b on a.kode_desa=b.id_desa 
                                where kode_desa='$kode_desa'
                                ORDER BY kode_desa");

        $results = $query2->getResultArray();

        

        $data =  [
           
            'nama_desa' => $row->nama_desa,
            'table_data' => $results,
            
            
        ];

        return $data;
    }
}
