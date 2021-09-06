<?= $this->extend('layout/main_template') ?>

<?= $this->section('content') ?>
<?php $sessnama = session()->get('nama');
?>
<div class="container-fluid py-4">
    <div class="row">
        <!-- Page Heading -->
        <div class="row mt-3 mb-4">

            <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div class="card">
                    <div class="card-body p-3">
                        <div class="row">
                            <div class="col-8">
                                <div class="numbers">
                                    <p class="text-sm mb-0 text-capitalize font-weight-bold">Jumlah BPP</p>
                                    <h5 class="font-weight-bolder mb-0">
                                        <?= number_format(14); ?>
                                    </h5>
                                </div>
                            </div>
                            <div class="col-4 text-end">
                                <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                    <i class="fas fa-user"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div class="card">
                    <div class="card-body p-3">
                        <div class="row">
                            <div class="col-8">
                                <div class="numbers">
                                    <p class="text-sm mb-0 text-capitalize font-weight-bold">Jumlah Poktan</p>
                                    <h5 class="font-weight-bolder mb-0">
                                        <?= number_format(1253); ?>
                                    </h5>
                                </div>
                            </div>
                            <div class="col-4 text-end">
                                <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                    <i class="fas fa-user"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div class="card">
                    <div class="card-body p-3">
                        <div class="row">
                            <div class="col-8">
                                <div class="numbers">
                                    <p class="text-sm mb-0 text-capitalize font-weight-bold">Jumlah Gapoktan</p>
                                    <h5 class="font-weight-bolder mb-0">
                                        <?= number_format(236); ?>
                                    </h5>
                                </div>
                            </div>
                            <div class="col-4 text-end">
                                <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                    <i class="fas fa-user"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6">
                <div class="card">
                    <div class="card-body p-3">
                        <div class="row">
                            <div class="col-8">
                                <div class="numbers">
                                    <p class="text-sm mb-0 text-capitalize font-weight-bold">Jumlah KEP</p>
                                    <h5 class="font-weight-bolder mb-0">
                                        <?= number_format(20); ?>
                                    </h5>
                                </div>
                            </div>
                            <div class="col-4 text-end">
                                <div class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                                    <i class="fas fa-user"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>

        <div class="row">

            <nav class="col-lg-12">
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Profil</button>
                    <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Kontak</button>
                </div>
            </nav>
            <div class="tab-content " id="nav-tabContent">
                <div class="tab-pane  fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <div class="row">
                        <div class="col-lg-8 mb-lg-0 mb-4">
                            <div class="card">
                                <div class="card-body p-3">
                                    <div class="row">
                                        <h1 class="h3 mb-4 text-gray-800"><?= $title; ?></h1>
                                        <div class="col-lg-12">
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item">Nama Kelembagaan : <?= $dt['deskripsi_lembaga_lain']; ?> <?= $sessnama; ?> </li>
                                                <li class="list-group-item">Tanggal Pembentukan : <?= $dt['tgl_berdiri'] . '-' . $dt['bln_berdiri'] . '-' . $dt['thn_berdiri']; ?> </li>
                                                <li class="list-group-item">Alamat : <?= $dt['alamat']; ?></li>
                                                <li class="list-group-item">Provinsi : <?= $dt['kode_prop']; ?></li>
                                                <li class="list-group-item">No Telepon/Fax : <?= $dt['telp_kantor']; ?></li>
                                                <li class="list-group-item">Alamat Email: <?= $dt['email']; ?></li>
                                                <li class="list-group-item">Alamat Website <?= $dt['website']; ?></li>
                                                <li class="list-group-item">Nama Pimpinan <?= $dt['nama_kabid']; ?></li>
                                                <li class="list-group-item">No HP Pimpinan <?= $dt['hp_kabid']; ?></li>
                                                <li class="list-group-item">Nama Koordinator PP <?= $dt['nama_koord_penyuluh']; ?></li>
                                            </ul>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 mb-lg-0 mb-4 text-center">
                            <div class="card">
                                <div class="card-body p-3 ">
                                    <img src="<?= base_url('assets/img/logo.png'); ?>" width="150px" class="img-thumbnail" alt="profil">
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">3</div>
            </div>

        </div>
        <?php echo view('layout/footer'); ?>

    </div>
</div>

<?= $this->endSection() ?>