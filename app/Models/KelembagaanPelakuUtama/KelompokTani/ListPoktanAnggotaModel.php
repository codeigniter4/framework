<?php

namespace App\Models\KelembagaanPelakuUtama\KelompokTani;

use CodeIgniter\Model;
use \Config\Database;

class ListPoktanAnggotaModel extends Model
{
   // protected $table      = 'penyuluh';
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


    public function getListPoktanAnggotaTotal($ip)
    {
        $db = Database::connect();
        $query = $db->query("select nama_poktan,kode_prop,kode_kab,kode_kec,kode_desa from tb_poktan where id_poktan='$ip'");
        $row   = $query->getRow();
        
        
        
        $query3   = $db->query("select id_anggota,id_poktan,nama_anggota,no_ktp,tempat_lahir,tgl_lahir,bln_lahir,thn_lahir,alamat_ktp,
                                jenis_kelamin,no_hp,
                                case status_anggota 
                                when '1' then 'Sebagai Anggota'
                                when '2' then 'Calon Anggota'
                                else '' end status_anggota,
                                b.nama_komoditas as kode_komoditas1,
                                c.nama_komoditas as kode_komoditas2 ,
                                d.nama_komoditas as kode_komoditas3,
                                volume,
                                volume2,
                                volume3,
                                lainnya,luas_lahan_ternak_diusahakan,luas_lahan_ternak_dimiliki,
                                case kategori_petani_penggarap
                                when '1' then 'Pemilik Lahan'
                                when '2' then 'Pemilik dan Penggarap'
                                when '3' then 'Penggarap'
                                when '4' then 'Buruh'
                                else '' end kategori_petani_penggarap,
                                titik_koordinat_lahan 
                                from tb_poktan_anggota a
                                left join(select * from tb_komoditas) b on a.kode_komoditas=b.kode_komoditas
                                left join(select * from tb_komoditas) c on a.kode_komoditas2=c.kode_komoditas
                                left join(select * from tb_komoditas) d on a.kode_komoditas3=d.kode_komoditas
                                where id_poktan='$ip'
                                ORDER BY  nama_anggota  ");

        $results = $query3->getResultArray();


        $data =  [
            
            'nama_poktan' => $row->nama_poktan,
            'table_data' => $results,
           
          //  'jup' => $row4->jup
        ];

        return $data;
    }
}
