<?php

namespace App\Controllers\Auth;

use App\Controllers\BaseController;
use App\Models\UserModel;

class Login extends BaseController
{
    public function index()
    {
        $data = [
            'title' => 'Login'
        ];

        return view('login', $data);
    }

    public function proses()
    {
        $session = session();
        $model = new UserModel();
        $username = $this->request->getVar('username');
        $password = $this->request->getVar('password');
        $data = $model->where('username', $username)->first();
        // dd($data);
        if ($data) {
            $pass = $data['password'];
            //$verify_pass = password_verify(md5($password), $pass);
            if (md5($password) == $pass) {
                $ses_data = [
                    'userid'       => $data['id'],
                    'username'      => $data['username'],
                    'nama'          => $data['name'],
                    'idprop' => $data['idProp'],
                    'kodebapel' => $data['kodeBapel'],
                    'kodebpp' => $data['kodeBpp'],
                    'logged_in'     => TRUE
                ];
                $session->set($ses_data);
                return redirect()->to('profil/lembaga');
            } else {
                $session->setFlashdata('msg', 'Wrong Password');
                return redirect()->to('login');
            }
        } else {
            $session->setFlashdata('msg', 'User not Found');
            return redirect()->to('/login');
        }
    }

    public function logout()
    {
        $session = session();
        $session->destroy();
        return redirect()->to('/login');
    }
}
