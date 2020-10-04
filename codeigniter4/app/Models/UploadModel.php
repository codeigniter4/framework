<?php namespace App\Models;

use CodeIgniter\Model;

class UploadModel extends Model
{
    protected $DBGroup = 'default';

    protected $table      = 'uploads';
    protected $primaryKey = 'id';

    protected $returnType     = 'array';
    // protected $useSoftDeletes = true;
    protected $allowedFields = [
      'name',
      'type',
      'recordId',
      'path',
      'description',
      'title',
      'private',
      'encoded',
    ];

    protected $useTimestamps = false;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    protected $validationRules    = [];
    protected $validationMessages = [];
    protected $skipValidation     = false;
}
