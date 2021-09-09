<?php

function is_logged_in()
{
    $session = session();
    if (empty($session->get('kodebapel'))) {
        return redirect()->to('login');
    }
    return $session->get('kodebapel');
}

function format_rupiah($angka)
{
    $rupiah = number_format($angka, 0, ',', '.');
    return $rupiah;
}


// function check_access($role_id, $menu_id)
// {
//     $ci = get_instance();

//     $ci->db->where('role_id', $role_id);
//     $ci->db->where('menu_id', $menu_id);
//     $result = $ci->db->get('user_access_menu');

//     if ($result->num_rows() > 0) {
//         return "checked='checked'";
//     }
// }
