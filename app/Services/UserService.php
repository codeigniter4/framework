<?php namespace App\Services;
use App\Models\UserModel;

// Get user info takes connection and sql query
class UserService {
  function __construct()
   {

   }

   public function getUsers()
   {
     $userModel = new UserModel();
     $users = $userModel->findAll();
     return $users;
   }

   public function saveUser($data)
   {
     $userModel = new UserModel();
     $userModel->save($data);
     $user = $userModel->find($data);
     return $user;
   }

   public function getUser($user_id)
   {
     $userModel = new UserModel();
     $users = $userModel->find($user_id);
     return $users;
   }

   public function updateUserById($user_id, $data)
   {
     $userModel = new UserModel();
     $userModel->update($user_id, $data);
     $user = $userModel->find($user_id);
     return $user;
   }

   public function deleteUserById($user_id)
   {
     $userModel = new UserModel();
     $user = $userModel->find($user_id);
     $userModel->delete([$user_id]);

     return $user;
   }
}
