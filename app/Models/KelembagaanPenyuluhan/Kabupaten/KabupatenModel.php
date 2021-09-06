<?php

namespace App\Models\KelembagaanPenyuluhan\Kabupaten;

use CodeIgniter\Model;
use \Config\Database;

class KabupatenModel extends Model
{
    //protected $table      = 'penyuluh';
    //protected $primaryKey = 'id';


    //protected $returnType     = 'array';
    //protected $useSoftDeletes = true;

    //protected $allowedFields = ['nama', 'alamat', 'telpon'];


    // protected $useTimestamps = false;
    // protected $createdField  = 'created_at';
    // protected $updatedField  = 'updated_at';
    // protected $deletedField  = 'deleted_at';

    // protected $validationRules    = [];
    // protected $validationMessages = [];
    // protected $skipValidation     = false;


    public function getKabTotal($kode_kab)
    {
        $db = Database::connect();
        $query = $db->query("select nama_dati2 as nama_kab from tbldati2 where id_dati2='$kode_kab'");
        $row   = $query->getRow();
        $query2 = $db->query("SELECT count(idpos) as jum_des FROM tb_posluhdes where kode_kab ='$kode_kab'");
        $row2   = $query2->getRow();
        $query3  = $db->query("select a.alamat, a.ketua, a.tgl_update, a.nama_bapel,
                                    case a.nama_bapel 
                                    when '10' then 'Badan Pelaksana Penyuluhan Pertanian, Perikanan dan Kehutanan'
                                    when '20' then 'Badan Pelaksana Penyuluhan'
                                    when '31' then deskripsi_lembaga_lain
                                    when '32' then deskripsi_lembaga_lain
                                    when '33' then deskripsi_lembaga_lain
                                    else '' end nama_bapel
                                from tblbapel a
                                where kabupaten='$kode_kab'
                                ");
        $results = $query3->getResultArray();

        $data =  [
            'jum_des' => $row2->jum_des,
            'nama_kab' => $row->nama_kab,
            'table_data' => $results,
        ];

        return $data;
    }
}
