-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 10 Agu 2021 pada 05.05
-- Versi server: 10.4.20-MariaDB
-- Versi PHP: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `simluhdb`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `penyuluh`
--

CREATE TABLE `penyuluh` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `telpon` varchar(12) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `penyuluh`
--

INSERT INTO `penyuluh` (`id`, `nama`, `alamat`, `telpon`, `created_at`, `updated_at`) VALUES
(1, 'Rudi Salam', 'Jl Kutilang no 21, Depok', '08126666688', '2021-08-08 17:10:52', '2021-08-08 17:10:52'),
(2, 'Greysia Polli', 'Jl. Mentawai No 22, Sulawesi Tengah', '0811222333', '2021-08-08 17:11:42', '2021-08-08 17:11:42'),
(3, 'Kevin Sanjaya', 'Jl. Barito No 44', '0822332233', '2021-08-08 17:11:42', '2021-08-08 17:11:42');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `penyuluh`
--
ALTER TABLE `penyuluh`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `penyuluh`
--
ALTER TABLE `penyuluh`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
