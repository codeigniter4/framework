<?php namespace App\Models;

use CodeIgniter\Model;

class EmployeeModel extends Model
{
    protected $DBGroup = 'default';

    protected $table      = 'empinfo';
    protected $primaryKey = 'id';

    protected $returnType     = 'array';
    // protected $useSoftDeletes = true;
    protected $allowedFields = [
      'firstname',
      'lastname',
      'position',
      'title',
      'employer',
      'employment',
      'pay_structure',
      'compensation',
      'phone_number',
      'email',
      'address',
      'city',
      'state',
      'zip',
      'gender',
      'dob',
      'hire_date',
      'cdl_num',
      'cdl_state',
      'cdl_exp',
      'med_cert_exp',
      'detentionRate',
      'layoverRate',
      'breakdownRate'
    ];

    protected $useTimestamps = false;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    protected $validationRules    = [];
    protected $validationMessages = [];
    protected $skipValidation     = false;
}
