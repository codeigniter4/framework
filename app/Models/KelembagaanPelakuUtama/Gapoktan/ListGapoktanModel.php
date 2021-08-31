<?php

namespace App\Models\KelembagaanPelakuUtama\Gapoktan;

use CodeIgniter\Model;
use \Config\Database;

class ListGapoktanModel extends Model
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


    public function getListGapoktanTotal($kode_kec)
    {
        $db = Database::connect();
        $query = $db->query("select deskripsi from tbldaerah where id_daerah='$kode_kec'");
        $row   = $query->getRow();
        
        $query2   = $db->query("select nm_desa,id_gap,kode_desa,kode_kec,nama_gapoktan,ketua_gapoktan,
                                simluh_bendahara,alamat and id_gap as jum from tb_gapoktan a
                                left join tbldesa b on a.id_desa=b.kode_kec and b.kode_kec='$kode_kec'
                                where id_daerah='$kode_kec'
                                group by id_daerah, deskripsi
                                order by deskripsi");
        $results = $query2->getResultArray();

        $data =  [
            'nama_kec' => $row->nama_kec,
            'table_data' => $results,
        ];

        return $data;
    }
}
