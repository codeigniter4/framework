<?php namespace App\Services;
use App\Models\UploadModel;

// Get Upload info takes connection and sql query
class UploadService {
  function __construct()
   {

   }

   public function getRecords()
   {
     $model = new UploadModel();
     $records = $model->findAll();
     return $records;
   }

   public function saveRecord($data)
   {
     $model = new UploadModel();
     $model->save($data);
     $record = $model->find($data);
     return $record;
   }

   public function getRecord($record_id)
   {
     $model = new UploadModel();
     $record = $model->find($record_id);
     return $record;
   }

   public function deleteRecordById($record_id)
   {
     $model = new UploadModel();
     $record = $model->find($record_id);
     $model->delete([$record_id]);

     return $record;
   }

   public function getRecordWithAttrs($attr)
   {
     $model = new UploadModel();
     $records = $model->where('type', $attr)->findAll();;
     return $records;
   }
}
