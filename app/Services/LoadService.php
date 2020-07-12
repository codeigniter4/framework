<?php namespace App\Services;
use App\Models\LoadModel;

// Get Load info takes connection and sql query
class LoadService {
  function __construct()
   {

   }

   public function getLoads()
   {
     $loadModel = new LoadModel();
     $loads = $loadModel->findAll();
     return $loads;
   }

   public function saveLoad($data)
   {
     $loadModel = new LoadModel();
     $loadModel->save($data);
     $loads = $loadModel->find($data);
     return $loads;
   }

   public function getLoad($load_id)
   {
     $loadModel = new LoadModel();
     $loads = $loadModel->find($load_id);
     return $loads;
   }

   public function deleteLoadById($load_id)
   {
     $loadModel = new LoadModel();
     $load = $loadModel->find($load_id);
     $loadModel->delete([$load_id]);

     return $load;
   }
}
