<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{

    // protected $table      = 'penyuluh';
    protected $table = 'tbluser';
    protected $allowedFields = ['username', 'password', 'name', 'status', 'lastlogin', 'idprop', 'kodebakor', 'kodebapel', 'kode_lembaga', 'kodebpp', 'p_oke'];


    //protected $returnType     = 'array';
    //protected $useSoftDeletes = true;

    protected $useTimestamps = false;
    // protected $createdField  = 'created_at';
    // protected $updatedField  = 'updated_at';
    // protected $deletedField  = 'deleted_at';

    // protected $validationRules    = [];
    // protected $validationMessages = [];
    // protected $skipValidation     = false;
}
