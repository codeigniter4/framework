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
     $records = $model->findAll();
     return $records;
   }

   public function saveRecord($data)
   {
     $model = new LoadModel();
     $model->save($data);
     $record = $recordModel->find($data);
     return $record;
   }

   public function getRecord($record_id)
   {
     $recordModel = new LoadModel();
     $record = $recordModel->find($record_id);
     return $record;
   }

   public function deleteRecordById($record_id)
   {
     $recordModel = new LoadModel();
     $record = $recordModel->find($record_id);
     $recordModel->delete([$record_id]);

     return $record;
   }
}
