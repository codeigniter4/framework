<?php

namespace App\Controllers\manage;

use App\Controllers\BaseController;

class User extends BaseController
{
    public function index()
    {
        $data = [
            'title' => 'User manajemen'
        ];

        return view('manage/user', $data);
    }
}
