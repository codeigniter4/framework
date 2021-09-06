<?php

namespace App\Controllers;

use App\Models\PenyuluhModel;


class Master extends BaseController
{
    public function jabatan()
    {
        $penyuluhModel = new PenyuluhModel();
        $penyuluh = $penyuluhModel->findAll();

        //dd($penyuluh);

        $data = [
            'title' => 'Jabatan',
            'dt' => $penyuluh
        ];

        return view('master/jabatan', $data);
    }

    public function poktan()
    {
        $penyuluhModel = new PenyuluhModel();
        $penyuluh = $penyuluhModel->findAll();

        //dd($penyuluh);

        $data = [
            'title' => 'Jabatan',
            'dt' => $penyuluh
        ];

        return view('master/jabatan', $data);
    }
}
