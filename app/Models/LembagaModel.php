<?php

namespace App\Models;

use CodeIgniter\Model;

class LembagaModel extends Model
{

    protected $table = 'tblbapel';

    //  protected $db = \Config\Database::connect();

    public function getProfil($id)
    {
        $query = $this->db->query("SELECT * FROM tblbapel where kabupaten = $id");
        $row   = $query->getRowArray();
        return $row;
    }
}
