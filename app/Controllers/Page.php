<?php

namespace App\Controllers;

use App\Models\LembagaModel;

class Page extends BaseController
{
    protected $session;


    function __construct()
    {
        $this->session = \Config\Services::session();
        $this->session->start();
    }

    public function dashboard()
    {

        $data = [
            'title' => 'Dashboard',
            'name' => 'dashboard'
        ];

        return view('dashboard', $data);
    }

    public function profil()
    {
        // echo "Welcome back, " . $this->session->get('email');

        $data = [
            'title' => 'Profil Lembaga',
            'name' => 'Adi'
        ];

        return view('profillembaga', $data);
    }

    public function penyuluh()
    {

        $data = [
            'title' => 'Profil penyuluh',
            'name' => 'Adi'
        ];

        return view('profilpenyuluh', $data);
    }
}
