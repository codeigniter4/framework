<?= $this->extend('layout/main_template') ?>

<?= $this->section('content') ?>


<button type="button" class="btn bg-gradient-primary">+ Tambah Data</button>
<div class="card">
    <div class="table-responsive">
        <table class="table align-items-center mb-0">
            <thead>
                <tr>
                    <td width="5" class="text-uppercase text-secondary text-xxs font-weight-bolder">No</td>
                    <td width="100" class="text-uppercase text-secondary text-xxs font-weight-bolder">Desa</td>
                    <td width="100" class="text-uppercase text-secondary text-xxs font-weight-bolder">Nama<br>Posluhdes</td>
                    <td width="12   0" class="text-uppercase text-secondary text-xxs font-weight-bolder" style="text-align: center;">Alamat</td>
                    <td width="100" class="text-uppercase text-secondary text-xxs font-weight-bolder" style="text-align: center;">Ketua</td>
                    <td width="100" class="text-uppercase text-secondary text-xxs font-weight-bolder" style="text-align: center;">Sekretaris</td>
                    <td width="90" class="text-uppercase text-secondary text-xxs font-weight-bolder" style="text-align: center;">Bendahara</td>
                    <td width="10" class="text-uppercase text-secondary text-xxs font-weight-bolder" style="text-align: center;">Tahun<br>Berdiri</td>
                    <td width="10" class="text-uppercase text-secondary text-xxs font-weight-bolder" style="text-align: center;">Jumlah<br>Anggota</td>
                    <td width="100" class="text-uppercase text-secondary text-xxs font-weight-bolder" style="text-align: center;">Penyuluh<br>Swadaya</td>
                    <td width="100" class="text-secondary opacity-7"></td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="align-middle text-center text-sm">
                        <p class="text-xs font-weight-bold mb-0">1</p>
                    </td>
                    <td width="50">
                        <p class="text-xs font-weight-bold mb-0">ARJOSARI</p>
                    </td>
                    <td class="align-middle text-center text-sm">
                        <p class="text-xs font-weight-bold mb-0">Adil Makmur</p>
                    </td>
                    <td class="align-middle text-center text-sm">
                        <p class="text-xs font-weight-bold mb-0">DESA ARJOSARI KECAMATAN ARJOSARI KABUPATEN PACITAN</p>
                    </td>
                    <td class="align-middle text-center text-sm">
                        <p class="text-xs font-weight-bold mb-0">WASESO</p>
                    </td>
                    <td class="align-middle text-center text-sm">
                        <p class="text-xs font-weight-bold mb-0">DIMYATI</p>
                    </td>
                    <td class="align-middle text-center text-sm">
                        <p class="text-xs font-weight-bold mb-0">TUMANGIN</p>
                    </td>
                    <td class="align-middle text-center text-sm">
                        <p class="text-xs font-weight-bold mb-0"></p>
                    </td>
                    <td class="align-middle text-center text-sm">
                        <p class="text-xs font-weight-bold mb-0">194</p>
                    </td>
                    <td class="align-middle text-center text-sm">
                        <p class="text-xs font-weight-bold mb-0"></p>
                    </td>
                    <td class="align-middle text-center text-sm">
                        <a href="#">
                            <button type="button" data-bs-toggle="modal" data-bs-target="#modal-form" class="btn bg-gradient-warning">
                                <i class="fas fa-edit"></i> Ubah
                            </button>
                        </a>
                    </td>
                    <td class="align-middle text-center text-sm">
                        <a href="#">
                            <button type="button" class="btn bg-gradient-danger">
                                <i class="fas fa-trash"></i> Hapus
                            </button>
                        </a>
                    </td>
                </tr>



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
                                            <label>Kecamatan</label>
                                            <div class="input-group mb-3">
                                                <input type="email" class="form-control" placeholder="Kecamatan" aria-label="Email" aria-describedby="email-addon" disabled>
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleFormControlSelect1">Desa</label>
                                                <select class="form-control" id="exampleFormControlSelect1">
                                                    <option>Mlati</option>
                                                    <option>Sedayu</option>
                                                    <option>Tremas</option>
                                                    <option>Arjosari</option>
                                                    <option>Gunungsari</option>
                                                </select>
                                            </div>
                                            <label>Nama Posluhdes</label>
                                            <div class="input-group mb-3">
                                                <input type="email" class="form-control" placeholder="nama posluhdes" aria-label="Password" aria-describedby="password-addon">
                                            </div>
                                            <label>Alamat</label>
                                            <div class="input-group mb-3">
                                                <input type="email" class="form-control" placeholder="alamat" aria-label="Password" aria-describedby="password-addon">
                                            </div>
                                            <label>Ketua</label>
                                            <div class="input-group mb-3">
                                                <input type="email" class="form-control" placeholder="ketua" aria-label="Password" aria-describedby="password-addon">
                                            </div>
                                            <label>Sekretaris</label>
                                            <div class="input-group mb-3">
                                                <input type="email" class="form-control" placeholder="sekretaris" aria-label="Password" aria-describedby="password-addon">
                                            </div>
                                            <label>Bendahara</label>
                                            <div class="input-group mb-3">
                                                <input type="email" class="form-control" placeholder="bendahara" aria-label="Password" aria-describedby="password-addon">
                                            </div>
                                            <label>tahun Berdiri</label>
                                            <div class="input-group mb-3">
                                                <input type="email" class="form-control" placeholder="tahun berdiri" aria-label="Password" aria-describedby="password-addon">
                                            </div>
                                            <label>Jumlah Anggota</label>
                                            <div class="input-group mb-3">
                                                <input type="email" class="form-control" placeholder="jumlah anggota" aria-label="Password" aria-describedby="password-addon">
                                            </div>
                                            <label>Penyuluh Swadaya</label>
                                            <div class="input-group mb-3">
                                                <input type="email" class="form-control" placeholder="pnyuluh swadaya" aria-label="Password" aria-describedby="password-addon">
                                            </div>
                                            <div class="text-center">
                                                <button type="button" class="btn btn-round bg-gradient-warning btn-lg w-100 mt-4 mb-0">Simpan Data</button>
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

<?= $this->endSection() ?>