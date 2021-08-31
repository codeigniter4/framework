<?= $this->extend('layout/main_template') ?>

<?= $this->section('content') ?>
<br>
<center><h2> Daftar Gapoktan di Kecamatan Arjosari </h2></center>
<br>
<a href="" button type="button" class="btn bg-gradient-primary" >+ Tambah Data</button></a>
<div class="card">
    <div class="table-responsive">
        <table class="table align-items-center mb-0">
            <thead>
                <tr>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder" style="text-align: center;">No</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder" style="text-align: center;">Nama Desa</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder" style="text-align: center;">Nama Gapoktan</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder" style="text-align: center;">Nama Ketua</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder" style="text-align: center;">Nama Bendahara</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder" style="text-align: center;">Alamat Sekretariat</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder" style="text-align: center;">Anggota Poktan</th>
                   
                    <th class="text-secondary opacity-7"></th>
                </tr>
            </thead>
            <tbody>
            <?php
            $i = 1;
            foreach ($tabel_data as $row) {
            ?>
            
                <tr>
                    <td class="align-middle text-center text-sm">
                        <p class="text-xs font-weight-bold mb-0"><?= $i++ ?></p>
                    </td>
                    <td class="align-middle text-center text-sm">
                        <p class="text-xs font-weight-bold mb-0"><?= $row['nm_desa'] ?></p>
                    </td>
                    <td class="align-middle text-center text-sm">
                        <p class="text-xs font-weight-bold mb-0"><?= $row['nama_gapoktan'] ?></p>
                    </td>
                    <td class="align-middle text-center text-sm">
                        <p class="text-xs font-weight-bold mb-0"><?= $row['ketua_gapoktan'] ?></p>
                    </td>
                    <td class="align-middle text-center text-sm">
                        <p class="text-xs font-weight-bold mb-0"><?= $row['simluh_bendahara'] ?></p>
                    </td>
                    <td class="align-middle text-center text-sm">
                        <p class="text-xs font-weight-bold mb-0"><?= $row['alamat'] ?></p>
                    </td>
                    <td class="align-middle text-center text-sm">
                        <p class="text-xs font-weight-bold mb-0"><?= $row['jum'] ?></p>
                    </td>
                  
                        <td class="align-middle text-center text-sm">
                        <a href="/gapoktan/list"></a><button type="button" class="btn btn-info btn-sm">
                             Detail
                        </button>
                        </a>
                    </td>
                </tr>
            <?php
            }
            ?>

            </tbody>

              

                <!-- Modal -->
                <div class="modal fade" id="modal-form" tabindex="-1" role="dialog" aria-labelledby="modal-form" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
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
                                                    <label>Nama lembaga</label>
                                                    <div class="input-group mb-3">
                                                        <input type="text" class="form-control" placeholder="Email" aria-label="Email" aria-describedby="email-addon">
                                                    </div>
                                                </div>
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
                                                <div class="col">
                                                    <label>Nama lembaga</label>
                                                    <div class="input-group mb-3">
                                                        <input type="text" class="form-control" placeholder="Email" aria-label="Email" aria-describedby="email-addon">
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
</tbody>
</table>
</div>
</div>
<?php echo view('layout/footer'); ?>
<?= $this->endSection() ?>