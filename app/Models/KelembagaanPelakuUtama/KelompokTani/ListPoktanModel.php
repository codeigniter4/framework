<?php

namespace App\Models\KelembagaanPelakuUtama\KelompokTani;

use CodeIgniter\Model;
use \Config\Database;

class ListPoktanModel extends Model
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


    public function getKelompokTaniTotal($kode_kec)
    {
        $db = Database::connect();
        $query = $db->query("select deskripsi as nama_kec from tbldaerah where id_daerah='$kode_kec'");
        $row   = $query->getRow();
        
        $query2 = $db->query("SELECT count(id_poktan) as jum FROM tb_poktan where kode_kec ='$kode_kec'");
        $row2   = $query2->getRow();
        
        $query3   = $db->query("select id_poktan,id_gap,kode_desa,kode_kec,nama_poktan,ketua_poktan,alamat,jum_anggota,b.nm_desa
                                from tb_poktan a
                                left join tbldesa b on a.kode_desa=b.id_desa 
                                where kode_kec='$kode_kec'
                                ORDER BY kode_desa, nama_poktan");

        $results = $query3->getResultArray();

        $query4 = $db->query("SELECT count(distinct no_ktp) as jumangg FROM tb_poktan_anggota where id_poktan ='id_poktan'");
        $row3   = $query4->getRow();

        //$query5 = $db->query("SELECT count(distinct nik) as jup from tb_rdkk_upload where kode_poktan='id_poktan'");
       // $row4   = $query5->getRow();

        $data =  [
            'jum' => $row2->jum,
            'nama_kec' => $row->nama_kec,
            'table_data' => $results,
            'jumangg' => $row3->jumangg,
          //  'jup' => $row4->jup
        ];

        return $data;
    }
}
