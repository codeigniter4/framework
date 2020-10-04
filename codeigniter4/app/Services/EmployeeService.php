<?php namespace App\Services;
use App\Models\EmployeeModel;

// Get Employee info takes connection and sql query
class EmployeeService {
  function __construct()
   {

   }

   public function getRecords()
   {
     $model = new EmployeeModel();
     $records = $model->findAll();
     return $records;
   }

   public function saveRecord($data)
   {
     $model = new EmployeeModel();
     $model->save($data);
     $record = $model->find($data);
     return $record;
   }

   public function getRecord($record_id)
   {
     $model = new EmployeeModel();
     $record = $model->find($record_id);
     return $record;
   }

   public function deleteRecordById($record_id)
   {
     $model = new EmployeeModel();
     $record = $model->find($record_id);
     $model->delete([$record_id]);

     return $record;
   }

   public function getRecordWithAttrs($attr)
   {
     $model = new EmployeeModel();
     $records = $model->where('position', $attr)->findAll();;
     return $records;
   }
}
