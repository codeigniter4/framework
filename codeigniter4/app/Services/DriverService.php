<?php namespace App\Services;
use App\Models\DriverModel;

// Get Driver info takes connection and sql query
class DriverService {
  function __construct()
   {

   }

   public function getRecords()
   {
     $model = new DriverModel();
     $records = $model->findAll();
     return $records;
   }

   public function saveRecord($data)
   {
     $model = new DriverModel();
     $model->save($data);
     $record = $model->find($data);
     return $record;
   }

   public function getRecord($record_id)
   {
     $model = new DriverModel();
     $record = $model->find($record_id);
     return $record;
   }

   public function deleteRecordById($record_id)
   {
     $model = new DriverModel();
     $record = $model->find($record_id);
     $model->delete([$record_id]);

     return $record;
   }
}
