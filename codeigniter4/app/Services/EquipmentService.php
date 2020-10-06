<?php namespace App\Services;
use App\Models\EquipmentModel;

// Get Equipment info takes connection and sql query
class EquipmentService {
  function __construct()
   {

   }

   public function getRecords()
   {
     $model = new EquipmentModel();
     $records = $model->findAll();
     return $records;
   }

   public function saveRecord($data)
   {
     $model = new EquipmentModel();
     $model->save($data);
     $record = $model->find($data);
     return $record;
   }

   public function getRecord($record_id)
   {
     $model = new EquipmentModel();
     $record = $model->find($record_id);
     return $record;
   }

   public function deleteRecordById($record_id)
   {
     $model = new EquipmentModel();
     $record = $model->find($record_id);
     $model->delete([$record_id]);

     return $record;
   }

   public function getRecordWithAttrs($attr)
   {
     $model = new EquipmentModel();
     $records = $model->where('type', $attr)->findAll();;
     return $records;
   }
}
