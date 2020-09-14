<?php namespace App\Services;
use App\Models\BaseModel;

// Get Base info takes connection and sql query
class BaseService {
  function __construct()
   {

   }

   public function getRecords()
   {
     $model = new BaseModel();
     $records = $model->findAll();
     return $records;
   }

   public function saveRecord($data)
   {
     $model = new BaseModel();
     $model->save($data);
     $record = $model->find($data);
     return $record;
   }

   public function getRecord($record_id)
   {
     $model = new BaseModel();
     $record = $model->find($record_id);
     return $record;
   }

   public function deleteRecordById($record_id)
   {
     $model = new BaseModel();
     $record = $model->find($record_id);
     $model->delete([$record_id]);

     return $record;
   }
}
