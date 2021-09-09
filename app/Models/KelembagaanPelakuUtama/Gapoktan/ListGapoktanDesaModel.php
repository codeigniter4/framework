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
        
        $query2   = $db->query("select a.id_poktan,a.id_gap,a.kode_desa,a.kode_kec,a.nama_poktan,a.ketua_poktan,a.jum_anggota,a.alamat, b.nm_desa,c.jum,c.id_poktan
                                from tb_poktan a
                                left join tbldesa b on a.kode_desa=b.id_desa 
                                left join(select id_poktan, count(id_poktan) as jum from tb_poktan_anggota GROUP BY id_poktan) c on a.id_poktan=c.id_poktan
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
