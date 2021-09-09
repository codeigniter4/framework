<?php

namespace App\Models\KelembagaanPelakuUtama\KelompokTani;

use CodeIgniter\Model;
use \Config\Database;

class KelompokTaniKecModel extends Model
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


    public function getKelompokTaniKecTotal($kode_kec)
    {
        $db = Database::connect();
        $query = $db->query("select nama_bpp as nama_kec from tblbpp where kecamatan='$kode_kec'");
        $row   = $query->getRow();
        
       
        
    //   $query3   = $db->query("select a.kode_bp3k ,b.kecamatan,c.deskripsi,d.jum
                     //          from tblbpp a
                     //          left join from tblbpp_wil_kec b on a.kode_bp3k=b.kode_bp3k
                     //          left join from tbldaerah c on a.kecamatan=c.id_daerah
                     //          left join (select count(id_poktan) as jum from tb_poktan) d on a.kecamatan=d.kode_kec
                     //          where kecamatan='$kode_kec'");
     //   $results = $query3->getResultArray();

        $data =  [
            'nama_kec' => $row->nama_kec,
          //  'table_data' => $results,
        ];

        return $data;
    }
}
