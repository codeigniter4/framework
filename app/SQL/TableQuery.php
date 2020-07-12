<?php namespace App\SQL;

// Get Table info takes connection and sql query
class TableQuery {
  function __construct()
   {

   }

   public function getCreateQuery($table, $data)
   {
     $createStmn = $table;
     $createTableStatement = '(id int NOT NULL AUTO_INCREMENT,';
     // $blockCount = count($block);
     // $i = 0;
     foreach($data as $dataKey => $dataValues) {
         $getDataType = gettype($dataValues);

         if($getDataType == 'integer') {
           $createTableStatement .= '`'.$dataKey.'` int(11) DEFAULT NULL';
         } elseif($getDataType == 'double') {
           $createTableStatement .= '`'.$dataKey.'` float DEFAULT NULL';
         } elseif($getDataType == 'boolean') {
           $createTableStatement .= '`'.$dataKey.'` tinyint(2) DEFAULT NULL';
         } else {
           $createTableStatement .= '`'.$dataKey.'` varchar(255) DEFAULT NULL';
         }
         // $i++;
         //
         // if($blockCount > $i) {
           $createTableStatement .= ', ';
         // }


       };

       $createTableStatement .= 'PRIMARY KEY (`id`)';
       $createTableStatement .= ')';

       $createTableStatement .= "COLLATE='latin1_swedish_ci' ENGINE=InnoDB";

       $query = "CREATE TABLE " . $table . $createTableStatement;

       return $query;
   }
}
