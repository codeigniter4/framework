<?= $this->extend('layout/main_template') ?>

<?= $this->section('content') ?>
<div class="container-fluid py-4">
    <div class="row">
        <!-- Page Heading -->
        <div class="page-header min-height-150 border-radius-xl mt-4" style="background-image: url('<?= base_url(); ?>/assets/img/curved-images/curved0.jpg'); background-position-y: 50%;">
            <span class="mask bg-gradient-primary opacity-6"></span>
            <!-- <div class="card mb-3 col-lg-8 opacity-8">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src="<?= base_url('assets/img/profile/default.jpg') ?>" class="card-img">
                    </div>
                    <div class="col-md-8 ">
                        <div class="card-body">
                            <h5 class="card-title">Nama Penyuluh</h5>
                            <p class="card-text">Email Penyuluh</p>
                            <p class="card-text"><small class="text-muted">Member since <?= date('d F Y'); ?></small></p>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>
        <div class="card card-body blur shadow-blur mx-4 mt-n6 overflow-hidden">
            <div class="row gx-4">
                <div class="col-auto">
                    <div class="avatar avatar-xl position-relative">
                        <img src="<?= base_url('assets/img/profile/default.jpg') ?>" alt="profile_image" class="w-100 border-radius-lg shadow-sm">
                    </div>
                </div>
                <div class="col-auto my-auto">
                    <div class="h-100">
                        <h5 class="mb-1">
                            Nandhar Mundhy Nugroho
                        </h5>
                        <p class="mb-0 font-weight-bold text-sm">
                            198908252017061001
                        </p>
                        <p class="mb-0 font-weight-bold text-sm">
                            Penyuluh Pertanian Madya
                        </p>
                    </div>
                </div>

            </div>
        </div>



        <div class="row mt-3">

            <nav class="col-lg-12">
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Profil</button>
                    <button class="nav-link" id="nav-unker-tab" data-bs-toggle="tab" data-bs-target="#nav-unker" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Unit Kerja</button>
                    <button class="nav-link" id="nav-riwayat-tab" data-bs-toggle="tab" data-bs-target="#nav-jabatan" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Riwayat Jabatan</button>
                    <button class="nav-link" id="nav-pendidikan-tab" data-bs-toggle="tab" data-bs-target="#nav-pendidikan" type="button" role="tab" aria-controls="nav-pendidikan" aria-selected="false">Pendidikan</button>
                    <button class="nav-link" id="nav-pelatihan-tab" data-bs-toggle="tab" data-bs-target="#nav-pelatihan" type="button" role="tab" aria-controls="nav-pelatihan" aria-selected="false">Pelatihan</button>
                </div>
            </nav>
            <div class="tab-content " id="nav-tabContent">
                <div class="tab-pane  fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <div class="row">
                        <div class="col-lg-12 mb-lg-0 mb-4">
                            <div class="card">
                                <div class="card-body p-3">
                                    <div class="row">

                                        <div class="col-lg-12">
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item"><b>Nama Lengkap :</b> Nandhar Mundhy Nugroho</li>
                                                <li class="list-group-item"><b>NIP :</b> 198908252017061001</li>
                                                <li class="list-group-item"><b>NIK :</b> 3423435246545646</li>
                                                <li class="list-group-item"><b>Tempat/Tanggal Lahir :</b> Brebes, 25-08-1989 </li>
                                                <li class="list-group-item"><b>Agama :</b> Islam</li>
                                                <li class="list-group-item"><b>Bidang Keahlian :</b> Tanaman Pangan</li>
                                                <li class="list-group-item"><b>Pendidikan Akhir :</b> S2</li>
                                                <li class="list-group-item"><b>Bidang Pendidikan :</b> Pertanian</li>
                                                <li class="list-group-item"><b>Alamat Email : </b>nandhar@pertanian.go.id</li>
                                            </ul>
                                        </div>



                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

                <div class="tab-pane fade" id="nav-unker" role="tabpanel" aria-labelledby="nav-unker-tab">
                    <div class="row">
                        <div class="col-lg-12 mb-lg-0 mb-4">
                            <div class="card">
                                <div class="card-body p-3">
                                    <div class="row">

                                        <div class="col-lg-12">
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item"><b>Unit Kerja :</b> UPTD BP4 Wilayah IV</li>
                                                <li class="list-group-item"><b>Wilayah Kerja :</b> Tri Mulyo</li>
                                                <li class="list-group-item"><b>Poktan Binaan :</b></li>

                                            </ul>
                                        </div>



                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="tab-pane fade" id="nav-riwayat" role="tabpanel" aria-labelledby="nav-riwayat-tab">Riwayat Jabatan</div>
                <div class="tab-pane fade" id="nav-pendidikan" role="tabpanel" aria-labelledby="nav-pendidikan-tab">Pendidikan</div>
                <div class="tab-pane fade" id="nav-pelatihan" role="tabpanel" aria-labelledby="nav-pelatihan-tab">Pelatihan</div>
            </div>

        </div>

        <?php echo view('layout/footer'); ?>

    </div>
</div>

<?= $this->endSection() ?>