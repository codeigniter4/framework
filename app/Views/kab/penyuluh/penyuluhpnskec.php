<?= $this->extend('layout/main_template') ?>

<?= $this->section('content') ?>
<div class="container-fluid py-4">
    <div class="row">
        <!-- Map -->
        <div class="col-xs-12 col-md-12 col-lg-12 mb-4">
            <button type="button" class="btn bg-gradient-primary btn-sm">+ Tambah Data</button><br>
            <b>Kecamatan <?= $nama_kecamatan ?></b>
            <p>Ditemukan <?= $jml_data ?> data</p>
            <div class="card">
                <div class="table-responsive">
                    <table class="table align-items-center mb-0">
                        <thead>
                            <tr>
                                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">No</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">NIP</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Nama</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Unit<br>Kerja</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Tempat<br>Tugas</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Wilayah<br>Kerja</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Status</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Jabatan<br>Terakhir</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Terakhir<br>Update</th>
                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Data<br>Dasar</th>
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
                                        <p class="text-xs font-weight-bold mb-0"><?= $row['nip'] ?> /<?= $row['nip_lama'] ?></p>
                                    </td>
                                    <td class="align-middle text-center text-sm">
                                        <p class="text-xs font-weight-bold mb-0"><?= $row['gelar_dpn'] ?> <?= $row['nama'] ?> <?= $row['gelar_blk'] ?></p>
                                    </td>
                                    <td class="align-middle text-center text-sm">
                                        <p class="text-xs font-weight-bold mb-0"><?= $row['nama_bpp'] ?></p>
                                    </td>
                                    <td class="align-middle text-center text-sm">
                                        <p class="text-xs font-weight-bold mb-0">Kec.<?= ucwords(strtolower($row['kecamatan_tugas'])) ?></p>
                                    </td>
                                    <td class="align-middle text-sm">
                                        <p class="text-xs font-weight-bold mb-0">
                                            1. <?= $row['wil_kerja'] ?><br>
                                            2. <?= $row['wil_kerja2'] ?><br>
                                            3. <?= $row['wil_kerja3'] ?><br>
                                            4. <?= $row['wil_kerja4'] ?><br>
                                            5. <?= $row['wil_kerja5'] ?><br>
                                            6. <?= $row['wil_kerja6'] ?><br>
                                            7. <?= $row['wil_kerja7'] ?><br>
                                            8. <?= $row['wil_kerja8'] ?><br>
                                            9. <?= $row['wil_kerja9'] ?><br>
                                            10. <?= $row['wil_kerja10'] ?></p>
                                        </p>
                                    </td>
                                    <td class="align-middle text-center text-sm">
                                        <p class="text-xs font-weight-bold mb-0"><?= $row['status_kel'] ?></p>
                                    </td>
                                    <td class="align-middle text-center text-sm">
                                        <p class="text-xs font-weight-bold mb-0"></p>
                                    </td>
                                    </td>
                                    <td class="align-middle text-center text-sm">
                                        <p class="text-xs font-weight-bold mb-0"><?= $row['tgl_update'] ?></p>
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
                                                        <label>No KTP (16 Digit)</label>
                                                        <div class="input-group mb-3">
                                                            <input type="number" class="form-control" placeholder="Penulisan NIK disambung (tanpa tanda pemisah)" aria-label="Password" aria-describedby="password-addon">
                                                        </div>
                                                        <label>NIP (18 Digit)</label>
                                                        <div class="input-group mb-3">
                                                            <input type="number" class="form-control" placeholder="Penulisan NIP disambung (tanpa tanda pemisah)" aria-label="Email" aria-describedby="email-addon">
                                                        </div>
                                                        <label>Nama Penyuluh</label>
                                                        <div class="input-group mb-3">
                                                            <input type="text" class="form-control" placeholder="Nama" aria-label="Password" aria-describedby="password-addon">
                                                        </div>

                                                        <label>Gelar depan</label>
                                                        <div class="input-group mb-3">
                                                            <input type="text" class="form-control" placeholder="Gelar Depan" aria-label="Password" aria-describedby="password-addon">

                                                            <input type="text" class="form-control" placeholder="| Gelar Belakang" aria-label="Password" aria-describedby="password-addon">
                                                        </div>
                                                        <label>Tempat, Tanggal Lahir</label>
                                                        <div class="input-group mb-3">
                                                            <input type="text" class="form-control" placeholder="Tempat" aria-label="Password" aria-describedby="password-addon">
                                                            <input type="date" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="password-addon">
                                                        </div>
                                                        <label>Jenis Kelamin</label>
                                                        <div class="input-group mb-3">
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
                                                                <label class="form-check-label" for="inlineRadio1">Laki-laki</label>
                                                            </div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                                                                <label class="form-check-label" for="inlineRadio2">Perempuan</label>
                                                            </div>
                                                        </div>
                                                        <label>Agama</label>
                                                        <div class="input-group mb-3">
                                                            <select class="form-select" aria-label="Default select example">
                                                                <option selected>Pilih Agama</option>
                                                                <option value="Islam">Islam</option>
                                                                <option value="Protestan">Protestan</option>
                                                                <option value="Khatolik">Khatolik</option>
                                                                <option value="Hindu">Hindu</option>
                                                                <option value="Budha">Budha</option>
                                                                <option value="Lainnya">Lainnya</option>
                                                            </select>
                                                        </div>
                                                        <label>Bidang Keahlian</label>
                                                        <div class="input-group mb-3">
                                                            <select class="form-select" aria-label="Default select example">
                                                                <option selected>Pilih Bidang Keahlian</option>
                                                                <option value="Tanaman Pangan">Tanaman Pangan</option>
                                                                <option value="Peternakan">Peternakan</option>
                                                                <option value="Perkebunan">Perkebunan</option>
                                                                <option value="Horikultura">Horikultura</option>
                                                            </select>
                                                        </div>
                                                        <label>Tingkat Pendidikan Akhir</label>
                                                        <div class="input-group mb-3">
                                                            <select class="form-select" aria-label="Default select example">
                                                                <option selected>Pilih Tingkat Pendidikan Akhir</option>
                                                                <option value="S3 (Setara)">S3 (Setara)</option>
                                                                <option value="S2 (Setara)">S2 (Setara)</option>
                                                                <option value="S1 (Setara)">S1 (Setara)</option>
                                                                <option value="D4">D4</option>
                                                                <option value="SM">SM</option>
                                                                <option value="D3">D3</option>
                                                                <option value="D2">D2</option>
                                                                <option value="D1">D1</option>
                                                                <option value="SLTA">SLTA</option>
                                                                <option value="SLTP">SLTP</option>
                                                                <option value="D3">D3</option>
                                                            </select>
                                                        </div>
                                                        <label>Bidang Pendidikan</label>
                                                        <div class="input-group mb-3">
                                                            <select class="form-select" aria-label="Default select example">
                                                                <option selected>Pilih Bidang Pendidikan</option>
                                                                <option value="Pertanian">Pertanian</option>
                                                                <option value="Non Pertanian">Non Pertanian</option>
                                                            </select>
                                                        </div>
                                                        <label>Jurusan</label>
                                                        <div class="input-group mb-3">
                                                            <input type="text" class="form-control" placeholder="Jurusan" aria-label="Password" aria-describedby="password-addon">
                                                        </div>
                                                        <label>Nama Sekolah/Universitas</label>
                                                        <div class="input-group mb-3">
                                                            <input type="text" class="form-control" placeholder="Nama Sekolah/Universitas" aria-label="Password" aria-describedby="password-addon">
                                                        </div>
                                                    </div>
                                                    <!-- <div class="col">
                                                    <label for="lokasikerja">Lokasi Kerja</label>
                                                    <div class="input-group mb-3" id="lokasikerja">
                                                        <select class="form-control" aria-label="Default select example" id="lokasikerja">
                                                            <option selected>Pilih Hari</option>
                                                            <option value="kabupaten">Kabupaten</option>
                                                            <option value="selasa">Selasa</option>
                                                        </select>
                                                    </div>

                                                    <div class="input-group mb-3" id="kecamatan1DIV">
                                                        <select class="form-select" aria-label="Default select example" id="kecamatan1">
                                                            <option selected>Pilih Kecamatan 1</option>
                                                            <option value="Arjosari">Arjosari</option>
                                                            <option value="Bandar">Bandar</option>
                                                            <option value="Donorojo">Donorojo</option>
                                                            <option value="Kebonagung">Kebonagung</option>
                                                            <option value="Nawangan">Nawangan</option>
                                                            <option value="Ngadirojo">Ngadirojo</option>
                                                            <option value="Pacitan">Pacitan</option>
                                                            <option value="Pringkuku">Pringkuku</option>
                                                            <option value="Sudimoro">Sudimoro</option>
                                                            <option value="Tulakan">Tulakan</option>
                                                            <option value="Tegalombo">Tegalombo</option>
                                                            <option value="Punung">Punung</option>
                                                        </select>
                                                    </div>
                                                    <div class="input-group mb-3" id="kecamatan2DIV">
                                                        <select class="form-select" aria-label="Default select example" id="kecamatan2">
                                                            <option selected>Pilih Kecamatan 2</option>
                                                            <option value="Arjosari">Arjosari</option>
                                                            <option value="Bandar">Bandar</option>
                                                            <option value="Donorojo">Donorojo</option>
                                                            <option value="Kebonagung">Kebonagung</option>
                                                            <option value="Nawangan">Nawangan</option>
                                                            <option value="Ngadirojo">Ngadirojo</option>
                                                            <option value="Pacitan">Pacitan</option>
                                                            <option value="Pringkuku">Pringkuku</option>
                                                            <option value="Sudimoro">Sudimoro</option>
                                                            <option value="Tulakan">Tulakan</option>
                                                            <option value="Tegalombo">Tegalombo</option>
                                                            <option value="Punung">Punung</option>
                                                        </select>
                                                    </div>
                                                </div> -->
                                                    <div class="col">
                                                        <label>Tgl SK CPNS</label>
                                                        <div class="input-group mb-3">
                                                            <input type="date" class="form-control" placeholder="Tgl SK PPPK" aria-label="Password" aria-describedby="password-addon">
                                                        </div>
                                                        <label>Gol/Jabatan Terakhir</label>
                                                        <div class="input-group mb-3">
                                                            <input type="text" class="form-control" placeholder="Gol/Jabatan Terakhir" aria-label="Password" aria-describedby="password-addon" disabled>
                                                        </div>
                                                        <label>Tanggal TMT Jabatan</label>
                                                        <div class="input-group mb-3">
                                                            <input type="text" class="form-control" placeholder="Tanggal TMT Jabatan" aria-label="Password" aria-describedby="password-addon" disabled>
                                                        </div>
                                                        <label>Tgl SK Penyuluh</label>
                                                        <div class="input-group mb-3">
                                                            <input type="date" class="form-control" placeholder="Tgl SPMT" aria-label="Password" aria-describedby="password-addon">
                                                        </div>>
                                                        <label>Alamat Rumah</label>
                                                        <div class="input-group mb-3">
                                                            <textarea class="form-control" placeholder="Alamat Rumah" id="floatingTextarea"></textarea>
                                                        </div>
                                                        <label>Kabupaten</label>
                                                        <div class="input-group mb-3">
                                                            <input type="text" class="form-control" placeholder="Kabupaten" aria-label="Password" aria-describedby="password-addon">

                                                            <input type="text" class="form-control" placeholder="| Kode Pos" aria-label="Password" aria-describedby="password-addon">
                                                        </div>
                                                        <label>Provinsi</label>
                                                        <div class="input-group mb-3">
                                                            <select class="form-select" aria-label="Default select example">
                                                                <option selected>Pilih Provinsi</option>
                                                                <option value="Aceh">Aceh</option>
                                                                <option value="BALI">BALI</option>
                                                                <option value="BANTEN">BANTEN</option>
                                                                <option value="BENKULU">BENKULU</option>
                                                                <option value="DI YOGYAKARTA">DI YOGYAKARTA</option>
                                                                <option value="DKI JAKARTA">DKI JAKARTA</option>
                                                                <option value="GORONTALO">GORONTALO</option>
                                                                <option value="JAMBI">Kec. Pringkuku</option>
                                                                <option value="JAWA BARAT">JAWA BARAT</option>
                                                                <option value="JAWA TENGAH">JAWA TENGAH</option>
                                                                <option value="JAWA TIMUR">JAWA TIMUR</option>
                                                                <option value="KALIMANTAN BARAT">KALIMANTAN BARAT</option>
                                                                <option value="KALIMANTAN SELATAN">KALIMANTAN SELATAN</option>
                                                                <option value="KALIMANTAN TENGAH">KALIMANTAN TENGAH</option>
                                                                <option value="KALIMANTAN TIMUR">KALIMANTAN TIMUR</option>
                                                                <option value="KALIMANTAN UTARA">KALIMANTAN UTARA</option>
                                                                <option value="KEPULAUAN BANGKA BELITUNG">KEPULAUAN BANGKA BELITUNG</option>
                                                                <option value="KEPULAUAN RIAU">KEPULAUAN RIAU</option>
                                                                <option value="MALUKU">MALUKU</option>
                                                                <option value="MALUKU UTARA">MALUKU UTARA</option>
                                                                <option value="NUSA TENGGARA BARAT">NUSA TENGGARA BARAT</option>
                                                                <option value="NUSA TENGGARA TIMUR">NUSA TENGGARA TIMUR</option>
                                                                <option value="PAPUA">PAPUA</option>
                                                                <option value="PAPUA BARAT">PAPUA BARAT</option>
                                                                <option value="RIAU">RIAU</option>
                                                                <option value="SULAWESI BARAT">SULAWESI BARAT</option>
                                                                <option value="SULAWESI SELATAN">SULAWESI SELATAN</option>
                                                                <option value="SULAWESI TENGAH">SULAWESI TENGAH</option>
                                                                <option value="SULAWESI TENGGARA">SULAWESI TENGGARA</option>
                                                                <option value="SULAWESI UTARA">SULAWESI UTARA</option>
                                                                <option value="SUMATERA BARAT">SUMATERA BARAT</option>
                                                                <option value="SUMATERA SELATAN">SUMATERA SELATAN</option>
                                                                <option value="SUMATERA UTARA">SUMATERA UTARA</option>
                                                            </select>
                                                        </div>
                                                        <label>No.Telepon rumah</label>
                                                        <div class="input-group mb-3">
                                                            <input type="number" class="form-control" placeholder="No.Telepon rumah" aria-label="Password" aria-describedby="password-addon">
                                                            <input type="number" class="form-control" placeholder="| HP" aria-label="Password" aria-describedby="password-addon">
                                                        </div>
                                                        <label>Alamat Email</label>
                                                        <div class="input-group mb-3">
                                                            <input type="email" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="password-addon">
                                                        </div>
                                                    </div>
                                                    <div class="text-center">
                                                        <button type="button" class="btn btn-round bg-gradient-warning btn-sm">Simpan Data</button>
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
    <?php echo view('layout/footer'); ?>
</div>

<?= $this->endSection() ?>