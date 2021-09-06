<?= $this->extend('layout/main_template') ?>

<?= $this->section('content') ?>


<button type="button" class="btn bg-gradient-primary btn-sm">+ Tambah Data</button><br>
<b>Daftar Penyuluh THL APBD Kab <?= ucwords(strtolower($nama_kabupaten)) ?></b>
<p>Ditemukan <?= $jml_data ?> data</p>
<div class="card">
    <div class="table-responsive">
        <table class="table align-items-center mb-0">
            <thead>
                <tr>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder" style="text-align: center;">No</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder" style="text-align: center;">NIK</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder" style="text-align: center;">Nama</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder" style="text-align: center;">Nama Unit Kerja</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder" style="text-align: center;">Tempat Tugas<br>(Kecamatan)</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder" style="text-align: center;">Wilayah Kerja</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder" style="text-align: center;">Terakhir<br>Update</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder" style="text-align: center;">Aksi</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $i = 1;
                foreach ($tabel_data as $row) {
                ?>
                    <tr>
                        <td class="align-middle text-center text-sm">
                            <p class="text-xs font-weight-bold mb-8"><?= $i++ ?></p>
                        </td>
                        <td class="align-middle text-center text-sm">
                            <p class="text-xs font-weight-bold mb-8"><?= $row['no_peserta'] ?></p>
                        </td>
                        <td class="align-middle text-center text-sm">
                            <p class="text-xs font-weight-bold mb-8"><?= $row['nama'] ?></p>
                        </td>
                        <td class="align-middle text-center text-sm">
                            <p class="text-xs font-weight-bold mb-8"><?= $row['nama_bapel'] ?></p>
                        </td>
                        <td class="align-middle text-center text-sm">
                            <p class="text-xs font-weight-bold mb-8">Kec.<?= ucwords(strtolower($row['kecamatan_tugas'])) ?></p>
                        </td>
                        <td class="align-middle text-sm">
                            <p class="text-xs font-weight-bold mb-0">1. <?= $row['wil_kerja'] ?><br>
                                2. <?= $row['wil_kerja2'] ?><br>
                                3. <?= $row['wil_kerja3'] ?><br>
                                4. <?= $row['wil_kerja4'] ?><br>
                                5. <?= $row['wil_kerja5'] ?><br>
                                6. <?= $row['wil_kerja6'] ?><br>
                                7. <?= $row['wil_kerja7'] ?><br>
                                8. <?= $row['wil_kerja8'] ?><br>
                                9. <?= $row['wil_kerja9'] ?><br>
                                10. <?= $row['wil_kerja10'] ?></p>
                        </td>
                        <td class="align-middle text-center text-sm">
                            <p class="text-xs font-weight-bold mb-8"><?= $row['tgl_update'] ?></p>
                        </td>
                        </td>
                        <td class="align-middle text-center text-sm">
                            <a href="#">
                                <button type="button" data-bs-toggle="modal" data-bs-target="#modal-form" class="btn bg-gradient-warning btn-sm">
                                    <i class="fas fa-edit"></i> Ubah
                                </button>
                            </a>
                            <button type="button" class="btn bg-gradient-danger btn-sm">
                                <i class="fas fa-trash"></i> Hapus
                            </button>
                            </a>
                        </td>
                    </tr>
                <?php
                }
                ?>
            </tbody>
        </table>

        <!-- Modal -->
        <div class="modal fade" id="modal-form" tabindex="-1" role="dialog" aria-labelledby="modal-form" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
                <div class="modal-content">
                    <div class="modal-body p-0">
                        <div class="card card-plain">
                            <div class="card-header pb-0 text-left">
                                <h4 class="font-weight-bolder text-warning text-gradient">Ubah Data</h4>
                            </div>
                            <div class="card-body">
                                <form role="form text-left">
                                    <div class="row">
                                        <div class="col">
                                            <label>Nama lembaga</label>
                                            <div class="input-group mb-3">
                                                <input type="text" class="form-control" placeholder="Email" aria-label="Email" aria-describedby="email-addon">
                                            </div>
                                        </div>
                                        <div class="col">
                                            <label>Wilayah (Kecamatan)</label>
                                            <div class="input-group mb-3">
                                                <input type="email" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="password-addon">
                                            </div>
                                        </div>
                                        <label>Nama Pimpinan</label>
                                        <div class="input-group mb-3">
                                            <input type="email" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="password-addon">
                                        </div>
                                        <div class="text-center">
                                            <button type="button" class="btn btn-round bg-gradient-warning btn-lg w-100 mt-4 mb-0">Simpan Data</button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</div>

<?= $this->endSection() ?>