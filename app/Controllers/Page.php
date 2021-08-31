<?php

namespace App\Controllers;


class Page extends BaseController
{
    public function dashboard()
    {

        $data = [
            'title' => 'Dashboard',
            'name' => 'Adi'
        ];

        return view('dashboard', $data);
    }

    public function profil()
    {

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
