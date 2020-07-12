<?php namespace App\Services;
use App\SQL\TableQuery;

// Get Table info takes connection and sql query
class TableService {
  function __construct()
   {

   }

   public function createTable($tableName, $data)
   {
     $tableQuery = new TableQuery();
     $query = $tableQuery->getCreateQuery($tableName, $data);
     $db = db_connect();
     $createTable  = $db->query($query);
     return $createTable;
   }


   public function deleteTableById($table_id)
   {

     return $table_id;
   }
}
