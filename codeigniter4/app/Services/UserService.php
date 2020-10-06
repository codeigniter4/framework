<?php namespace App\Services;
use App\Models\UserModel;

// Get User info takes connection and sql query
class UserService {
  function __construct()
   {

   }

   public function getRecords()
   {
     $model = new UserModel();
     $records = $model->findAll();
     return $records;
   }

   public function saveRecord($data)
   {
     $model = new UserModel();
     $model->save($data);
     $record = $model->find($data);
     return $record;
   }

   public function getRecord($record_id)
   {
     $model = new UserModel();
     $record = $model->find($record_id);
     return $record;
   }

   public function deleteRecordById($record_id)
   {
     $model = new UserModel();
     $record = $model->find($record_id);
     $model->delete([$record_id]);

     return $record;
   }
}
