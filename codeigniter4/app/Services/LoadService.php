<?php namespace App\Services;
use App\Models\LoadModel;
use CodeIgniter\I18n\Time;

// Get Load info takes connection and sql query
class LoadService {
  function __construct()
   {

   }

   public function getRecords()
   {
     $model = new LoadModel();
     $records = $model->orderBy('pickupDate', 'DESC')->findAll();
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

   public function getRecordByDate()
   {
     // $model = new LoadModel();
     $date = Time::createFromDate(2021, 1, 1);
     $model = new LoadModel();
     $records = $model->orderBy('id', 'DESC')->findAll();

     $userModel->where('pickupDate', 1)->findAll();
     // echo "string";
     return $date;
   }
}
