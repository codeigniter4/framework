<?php

namespace App\Controllers\profil;

use App\Controllers\BaseController;

class Penyuluh extends BaseController
{
    protected $session;
    function __construct()
    {
        $this->session = \Config\Services::session();
        $this->session->start();
    }

    public function index()
    {

        $data = [
            'title' => 'Profil penyuluh'
        ];

        return view('profil/profilpenyuluh', $data);
    }
}
