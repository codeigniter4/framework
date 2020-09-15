<?php namespace App\Services;
use App\Models\LoadModel;

// Get Load info takes connection and sql query
class LoadService {
  function __construct()
   {

   }

   public function getRecords()
   {
     $model = new LoadModel();
     $records = $model->orderBy('id', 'DESC')->findAll();
     return $records;
   }

   public function saveRecord($data)
   {
     $model = new LoadModel();
     $model->save($data);
     $record = $model->find($data);
     return $record;
   }

   public function getRecord($record_id)
   {
     $model = new LoadModel();
     $record = $model->find($record_id);
     return $record;
   }

   public function deleteRecordById($record_id)
   {
     $model = new LoadModel();
     $record = $model->find($record_id);
     $model->delete([$record_id]);

     return $record;
   }
}
