<?= $this->extend('layout/page_layout') ?>

<?= $this->section('content') ?>

<div class="container">
	<div class="row">
		<!-- <div class="col-md-12 my-2 card">
			<div class="card-body">
				<h5 class="h5">Codeigniter 4 Sudah Rilis!</h5>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam perferendis commodi tenetur quos ducimus repellat nulla, nam magni. Commodi iusto ad harum voluptas exercitationem facere eos earum laboriosam excepturi quas?</p>
			</div>
		</div>
		<div class="col-md-12 my-2 card">
			<div class="card-body">
				<h5 class="h5">Pengembangan Codeiginter 4 Tertunda</h5>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam perferendis commodi tenetur quos ducimus repellat nulla, nam magni. Commodi iusto ad harum voluptas exercitationem facere eos earum laboriosam excepturi quas?</p>
			</div>
		</div>
		<div class="col-md-12 my-2 card">
			<div class="card-body">
				<h5 class="h5">Wow, Ini 5 Startup yang Menggunakan Codeigniter</h5>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam perferendis commodi tenetur quos ducimus repellat nulla, nam magni. Commodi iusto ad harum voluptas exercitationem facere eos earum laboriosam excepturi quas?</p>
			</div>
		</div>
		<div class="col-md-12 my-2 card">
			<div class="card-body">
				<h5 class="h5">Codeigniter Ternyata Framework Terpopuler di Inodnesia</h5>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam perferendis commodi tenetur quos ducimus repellat nulla, nam magni. Commodi iusto ad harum voluptas exercitationem facere eos earum laboriosam excepturi quas?</p>
			</div>
		</div> -->

		<table class="table">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">id</th>
					<th scope="col">Jabatan</th>
					<!-- <th scope="col">Telepon</th> -->
				</tr>
			</thead>
			<tbody>
				<?php
				$no = 1;
				foreach ($dt as $row) : ?>
					<tr>
						<th scope="row"><?= $no++; ?></th>
						<td><?= $row['id_jab']; ?></td>
						<td><?= $row['nama_jab']; ?></td>
					</tr>
				<?php endforeach; ?>
			</tbody>
		</table>
	</div>
</div>

<?= $this->endSection() ?>