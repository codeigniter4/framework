<?= $this->extend('layout/main_template') ?>

<?= $this->section('content') ?>


<center><h2> Daftar Kelembagaan Ekonomi Petani di Kab <?= ucwords(strtolower($nama_kabupaten)) ?> </h2></center>
<div class="card">
    <div class="table-responsive">
        <table class="table align-items-center mb-0">
            <thead>
                <tr>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder" style="text-align: center;">No</th>
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder" style="text-align: center;">Nama Kecamatan</th>
                   
                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder" style="text-align: center;">Jumlah<br>Kelmbagaan Ekonomi<br>Petani</th>
                   
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
                        <p class="text-xs font-weight-bold mb-0"><?= $row['deskripsi'] ?></p>
                    </td>
                    <td class="align-middle text-center text-sm">
                        <p class="text-xs font-weight-bold mb-0"><?= $row['jum'] ?></p>
                  
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
           
        </table>
               
    </div>
</div>
</tbody>
</table>
</div>

</div>
<?php echo view('layout/footer'); ?>
<br>

<?= $this->endSection() ?>