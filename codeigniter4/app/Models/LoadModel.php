<?php namespace App\Models;

use CodeIgniter\Model;

class LoadModel extends Model
{
    protected $DBGroup = 'default';

    protected $table      = 'loads';
    protected $primaryKey = 'id';

    protected $returnType     = 'array';
    // protected $useSoftDeletes = true;
    protected $allowedFields = [
      'type',
      'status',
      'pickupDate',
      'dropoffDate',
      'pickupLocation',
      'dropoffLocation',
      'loadedMiles',
      'deadHead',
      'weight',
      'cargo',
      'rate',
      'broker',
      'detentionPay',
      'layoverPay',
      'notes',
      'user',
      'driver',
      'lumper',
      'tonu',
      'loadNumber'
    ];

    protected $useTimestamps = false;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    protected $validationRules    = [];
    protected $validationMessages = [];
    protected $skipValidation     = false;
}
