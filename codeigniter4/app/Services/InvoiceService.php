<?php namespace App\Services;
use App\Models\InvoiceModel;

// Get Invoice info takes connection and sql query
class InvoiceService {
  function __construct()
   {

   }

   public function getRecords()
   {
     $model = new InvoiceModel();
     $records = $model->findAll();
     return $records;
   }

   public function saveRecord($data)
   {
     $model = new InvoiceModel();
     $model->save($data);
     $record = $model->find($data);
     return $record;
   }

   public function getRecord($record_id)
   {
     $model = new InvoiceModel();
     $record = $model->find($record_id);
     return $record;
   }

   public function deleteRecordById($record_id)
   {
     $model = new InvoiceModel();
     $record = $model->find($record_id);
     $model->delete([$record_id]);

     return $record;
   }
}
