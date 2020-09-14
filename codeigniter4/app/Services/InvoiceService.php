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
     $records = $recordsModel->findAll();
     return $records;
   }

   public function saveRecord($data)
   {
     $model = new BrokerModel();
     $recordModel->save($data);
     $record = $recordModel->find($data);
     return $record;
   }

   public function getRecord($record_id)
   {
     $recordModel = new BrokerModel();
     $records = $recordModel->find($record_id);
     return $brokers;
   }

   public function deleteRecordById($record_id)
   {
     $recordModel = new BrokerModel();
     $record = $brokerModel->find($record_id);
     $recordModel->delete([$record_id]);

     return $record;
   }
}
