<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (file_exists(SYSTEMPATH . 'Config/Routes.php')) {
	require SYSTEMPATH . 'Config/Routes.php';
}

/**
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(true);

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
$routes->get('/', 'auth/Login::index');
$routes->get('/login', 'auth/Login::index');
$routes->get('/logout', 'auth/Login::logout');
$routes->get('/dashboard', 'Page::dashboard');
$routes->get('/lembaga', 'profil/Lembaga::index');

$routes->get('/penyuluhpns', 'Penyuluh/PenyuluhPns::penyuluhpns');
$routes->get('/penyuluhcpns', 'Penyuluh/PenyuluhCpns::penyuluhcpns');
$routes->get('/penyuluhthlapbn', 'Penyuluh/PenyuluhTHLAPBN::penyuluhthlAPBN');
$routes->get('/penyuluhthlapbd', 'Penyuluh/PenyuluhTHLAPBD::penyuluhthlAPBD');
$routes->get('/penyuluhswadaya', 'Penyuluh/PenyuluhSwadaya::penyuluhswadaya');
$routes->get('/penyuluhswasta', 'Penyuluh/PenyuluhSwasta::penyuluhswasta');
$routes->get('/penyuluhpppk', 'Penyuluh/PenyuluhPPPK::penyuluhpppk');
$routes->get('/penyuluhswadayakec', 'Penyuluh/PenyuluhSwadayaKec::penyuluhswadayakec');
$routes->get('/penyuluhthlapbnkec', 'Penyuluh/PenyuluhTHLAPBNKec::penyuluhthlAPBNkec');
$routes->get('/penyuluhthlapbdkec', 'Penyuluh/PenyuluhTHLAPBDKec::penyuluhthlAPBDkec');
$routes->get('/penyuluhswastakec', 'Penyuluh/PenyuluhSwastaKec::penyuluhswastakec');
$routes->get('/penyuluhpnskec', 'Penyuluh/PenyuluhPNSKec::penyuluhpnskec');
$routes->get('/penyuluhpppkkec', 'Penyuluh/PenyuluhPPPKKec::penyuluhpppkkec');

$routes->get('/penyuluh', 'profil/Penyuluh::index');


$routes->get('/desa', 'Kelembagaan/Desa::index');
$routes->get('/daftar_posluhdes', 'Kelembagaan/DaftarPosluhdes::index');
$routes->get('/kabupaten_kota', 'Kelembagaan/KabupatenKota::index');



/*
 * Myth:Auth routes file.
 */
$routes->group('', ['namespace' => 'Myth\Auth\Controllers'], function ($routes) {
	// Login/out
	$routes->get('login', 'AuthController::login', ['as' => 'login']);
	$routes->post('login', 'AuthController::attemptLogin');
	$routes->get('logout', 'AuthController::logout');

	// Registration
	$routes->get('register', 'AuthController::register', ['as' => 'register']);
	$routes->post('register', 'AuthController::attemptRegister');

	// Activation
	$routes->get('activate-account', 'AuthController::activateAccount', ['as' => 'activate-account']);
	$routes->get('resend-activate-account', 'AuthController::resendActivateAccount', ['as' => 'resend-activate-account']);

	// Forgot/Resets
	$routes->get('forgot', 'AuthController::forgotPassword', ['as' => 'forgot']);
	$routes->post('forgot', 'AuthController::attemptForgot');
	$routes->get('reset-password', 'AuthController::resetPassword', ['as' => 'reset-password']);
	$routes->post('reset-password', 'AuthController::attemptReset');
});


//KelembagaanPelakuUtamaRoutes

$routes->get('/gapoktan', 'KelembagaanPelakuUtama/Gapoktan/Gapoktan::gapoktan');
$routes->get('/listgapoktan', 'KelembagaanPelakuUtama/Gapoktan/ListGapoktan::listgapoktan');
$routes->get('/listgapoktandesa', 'KelembagaanPelakuUtama/Gapoktan/ListGapoktanDesa::listgapoktandesa');

$routes->get('/gapoktanbersama', 'KelembagaanPelakuUtama/GapoktanBersama/GapoktanBersama::gapoktanbersama');

$routes->get('/kelembagaanekonomipetani', 'KelembagaanPelakuUtama/KelembagaanEkonomiPetani::kelembagaanekonomipetani');
$routes->get('/listkep', 'KelembagaanPelakuUtama/KelembagaanEkonomiPetani/ListKEP::listkep');

$routes->get('/kelompoktani', 'KelembagaanPelakuUtama/KelompokTani/KelompokTani::kelompoktani');
$routes->get('/kelompoktanikec', 'KelembagaanPelakuUtama/KelompokTani/KelompokTaniKec::kelompoktanikec');
$routes->get('/listpoktan', 'KelembagaanPelakuUtama/KelompokTani/ListPokTan::listpoktan');
$routes->get('/listpoktananggota', 'KelembagaanPelakuUtama/KelompokTani/ListPoktanAnggota::listpoktananggota');

$routes->get('/kelembagaanpetanilainnya', 'KelembagaanPelakuUtama/KelembagaanPetaniLainnya/KelembagaanPetaniLainnya::kelembagaanpetanilainnya');
$routes->get('/listkep2l', 'KelembagaanPelakuUtama/KelembagaanPetaniLainnya/ListKEP2L::listkep2l');

$routes->get('/desa', 'KelembagaanPenyuluhan/Desa/Desa::desa');
$routes->get('/kabupaten_kota', 'KelembagaanPenyuluhan/Kabupaten/Kabupaten::kab');
$routes->get('/kecamatan', 'KelembagaanPenyuluhan/Kecamatan/Kecamatan::kecamatan');
/*
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (file_exists(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
	require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
