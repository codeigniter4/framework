<?php namespace App\Models;

use CodeIgniter\Model;

class EquipmentModel extends Model
{
    protected $DBGroup = 'default';

    protected $table      = 'equipment';
    protected $primaryKey = 'id';

    protected $returnType     = 'array';
    // protected $useSoftDeletes = true;
    protected $allowedFields = [
      'unit_num',
      'type',
      'sub_type',
      'year',
      'make',
      'model',
      'vin',
      'plate',
      'irp',
      'unladen_wt'
    ];

    protected $useTimestamps = false;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    protected $validationRules    = [];
    protected $validationMessages = [];
    protected $skipValidation     = false;
}
