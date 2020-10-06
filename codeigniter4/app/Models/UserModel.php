<?php namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $DBGroup = 'default';

    protected $table      = 'users';
    protected $primaryKey = 'id';

    protected $returnType     = 'array';
    // protected $useSoftDeletes = true;
    protected $allowedFields = [
      'username',
      'firstname',
      'lastname',
      'email',
      'password',
      'role',
      'company',
      'create_datetime',
      'last_login',
      'active',
      'status'
    ];

    protected $useTimestamps = false;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    protected $validationRules    = [];
    protected $validationMessages = [];
    protected $skipValidation     = false;
}
