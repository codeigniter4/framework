<main class="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
    <!-- Navbar -->
    <?php echo view('layout/navbar'); ?>
    <!-- End Navbar -->

    <!-- Content -->
    <?= $this->renderSection('content') ?>
    <!-- End Content -->
</main>