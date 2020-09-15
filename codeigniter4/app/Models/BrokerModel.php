<?php namespace App\Models;

use CodeIgniter\Model;

class BrokerModel extends Model
{
    protected $DBGroup = 'default';

    protected $table      = 'brokers';
    protected $primaryKey = 'id';

    protected $returnType     = 'array';
    // protected $useSoftDeletes = true;
    protected $allowedFields = [
      'name',
      'address',
      'phone',
      'contact',
      'Email',
      'billingContact',
      'billingEmail',
      'quickPay',
      'quickPayPercentage',
      'paymentTerms',
      'detentionRate',
      'tonuFee'
    ];

    protected $useTimestamps = false;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    protected $validationRules    = [];
    protected $validationMessages = [];
    protected $skipValidation     = false;
}
