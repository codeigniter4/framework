<?php namespace App\Models;

use CodeIgniter\Model;

class InvoiceModel extends Model
{
    protected $DBGroup = 'default';

    protected $table      = 'invoices';
    protected $primaryKey = 'id';

    protected $returnType     = 'array';
    // protected $useSoftDeletes = true;
    protected $allowedFields = [
      '*InvoiceNo',
      '*Customer',
      'BillingAddress',
      'CustomerEmail',
      'ServiceDate',
      '*InvoiceDate',
      '*DueDate',
      'Terms',
      'ItemDescription',
      'ProductService',
      'ItemQuantity',
      'ItemRate',
      '*ItemAmount',
      'billed',
      'brokerid'
    ];

    protected $useTimestamps = false;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $deletedField  = 'deleted_at';

    protected $validationRules    = [];
    protected $validationMessages = [];
    protected $skipValidation     = false;
}
