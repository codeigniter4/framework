<?php

namespace App\Controllers;


class Page extends BaseController
{
    public function about()
    {
        $data = [
            'title' => 'about'
        ];

        return view('about', $data);
    }

    public function contact()
    {

        $data = [
            'title' => 'kontak',
            'name' => 'Adi'
        ];

        return view('contact', $data);
    }


    public function faqs()
    {

        $data = [
            'title' => 'FAQ',
            'name' => 'Adi'
        ];

        return view('faq', $data);
    }

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
            'title' => 'Profil',
            'name' => 'Adi'
        ];

        return view('profillembaga', $data);
    }

    public function penyuluh()
    {

        $data = [
            'title' => 'Profil penyuluh',
            'name' => 'Raka'
        ];

        return view('profilpenyuluh', $data);
    }
}
