<?php namespace App\Services;
use App\Models\BrokerModel;

// Get Broker info takes connection and sql query
class BrokerService {
  function __construct()
   {

   }

   public function getBrokers()
   {
     $brokerModel = new BrokerModel();
     $brokers = $brokerModel->findAll();
     return $brokers;
   }

   public function saveBroker($data)
   {
     $brokerModel = new BrokerModel();
     $brokerModel->save($data);
     $brokers = $brokerModel->find($data);
     return $brokers;
   }

   public function getBroker($broker_id)
   {
     $brokerModel = new BrokerModel();
     $brokers = $brokerModel->find($broker_id);
     return $brokers;
   }

   public function deleteBrokerById($broker_id)
   {
     $brokerModel = new BrokerModel();
     $broker = $brokerModel->find($broker_id);
     $brokerModel->delete([$broker_id]);

     return $broker;
   }
}
