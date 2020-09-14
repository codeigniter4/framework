<?php namespace App\Services;
use App\Models\BrokerModel;

// Get Broker info takes connection and sql query
class BrokerService {
  function __construct()
   {

   }

   public function getRecords()
   {
     $model = new BrokerModel();
     $records = $model->findAll();
     return $records;
   }

   public function saveRecord($data)
   {
     $model = new BrokerModel();
     $model->save($data);
     $record = $model->find($data);
     return $record;
   }

   public function getRecord($record_id)
   {
     $model = new BrokerModel();
     $record = $model->find($record_id);
     return $record;
   }

   public function deleteRecordById($record_id)
   {
     $model = new BrokerModel();
     $record = $model->find($record_id);
     $model->delete([$record_id]);

     return $record;
   }
}
