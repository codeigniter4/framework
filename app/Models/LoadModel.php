<?php namespace App\Models;

use CodeIgniter\Model;

class LoadModel extends Model
{
    protected $DBGroup = 'default';

    protected $table      = 'dispatchboard';
    protected $primaryKey = 'id';

    protected $returnType     = 'array';
    // protected $useSoftDeletes = true;
    protected $allowedFields = ['db_type'];

    protected $useTimestamps = false;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    protected $validationRules    = [];
    protected $validationMessages = [];
    protected $skipValidation     = false;
}
