<?php

namespace App\Controllers\manage;

use App\Controllers\BaseController;

class Menu extends BaseController
{
    public function index()
    {
        $data = [
            'title' => 'Menu manajemen'
        ];

        return view('manage/menu', $data);
    }
}
