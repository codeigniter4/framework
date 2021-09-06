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
$routes->get('/', 'Login::index');
$routes->get('/about', 'Page::about');
$routes->get('/contact', 'Page::contact');
$routes->get('/faqs', 'Page::faqs');
$routes->get('/profil', 'Page::profil');
$routes->get('/dashboard', 'Page::dashboard');
$routes->get('/penyuluh', 'Page::penyuluh');
$routes->get('/login', 'Login::index');


$routes->get('/gapoktan', 'KelembagaanPelakuUtama/Gapoktan/Gapoktan::gapoktan');
$routes->get('/listgapoktan', 'KelembagaanPelakuUtama/Gapoktan/ListGapoktan::listgapoktan');
$routes->get('/listgapoktandesa', 'KelembagaanPelakuUtama/Gapoktan/ListGapoktanDesa::listgapoktandesa');

$routes->get('/kelembagaanekonomipetani', 'KelembagaanPelakuUtama/KelembagaanEkonomiPetani::kelembagaanekonomipetani');

$routes->get('/kelompoktani', 'KelembagaanPelakuUtama/KelompokTani/KelompokTani::kelompoktani');
$routes->get('/listpoktan', 'KelembagaanPelakuUtama/KelompokTani/ListPokTan::listpoktan');

$routes->get('/kelembagaanpetanilainnya', 'KelembagaanPelakuUtama/KelembagaanPetaniLainnya::kelembagaanpetanilainnya');

$routes->get('/desa', 'KelembagaanPenyuluhan/Desa/Desa::desa');
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
