<?php

namespace App\Controllers\profil;

use App\Controllers\BaseController;
use App\Models\LembagaModel;

class Lembaga extends BaseController
{
    protected $session;

    function __construct()
    {
        $this->session = \Config\Services::session();
        $this->session->start();
    }

    public function index()
    {
        // echo "Welcome back, " . $this->session->get('email');
        $lembagaModel = new LembagaModel();
        $dtlembaga = $lembagaModel->getProfil($this->session->get('kodebapel'));
        // echo $this->session->get('kodebapel');
        //dd($dtlembaga);
        $data = [
            'title' => 'Profil Lembaga',
            'dt' => $dtlembaga
        ];

        return view('profil/profillembaga', $data);
    }
}
