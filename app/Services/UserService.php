<?php namespace App\Services;

use App\Models\UserModel;

// Get user info takes connection and sql query
class UserService {
  function __construct()
   {

     echo "ug";
   }

   getUsers()
   {
      $userModel = new UserModel();
      return $userModel;
   }

}
