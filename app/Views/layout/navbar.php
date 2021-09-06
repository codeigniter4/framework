<main class="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
    <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
        <div class="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                    <li class="breadcrumb-item text-sm"><a class="opacity-5 text-dark" href="javascript:;">Pages</a></li>
                    <li class="breadcrumb-item text-sm text-dark active" aria-current="page"><?= $title; ?></li>
                </ol>
            </nav>
            <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                <div class="ms-md-auto pe-md-3 d-flex align-items-center">
                    <div class="input-group">
                        <span class="input-group-text text-body"><i class="fas fa-search" aria-hidden="true"></i></span>
                        <input type="text" class="form-control" placeholder="Type here...">
                    </div>
                </div>
                <ul class="navbar-nav  justify-content-end">


                    <li class="nav-item dropdown pe-2 d-flex align-items-center">
                        <a href="" class="nav-link text-body p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            Profil <i class="fa fa-user me-sm-1"></i>
                        </a>
                        <ul class="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4" aria-labelledby="dropdownMenuButton">
                            <li class="mb-2">
                                <a class="dropdown-item border-radius-md" href="javascript:;">
                                    <div class="d-flex py-1">
                                        <div class="my-auto">
                                            <img src="<?= base_url('assets/img/logo.png'); ?>" class="avatar avatar-sm">
                                        </div>
                                        <div class="d-flex flex-column justify-content-center">
                                            <h6 class="text-sm mb-1">
                                                <a href="<?= base_url('lembaga'); ?>" class="nav-link text-body p-0"><span class="font-weight-bold"><?php echo session()->get('nama'); ?></span> </a>
                                            </h6>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item px-3 d-flex align-items-center">
                        <a href="<?= base_url('logout'); ?>" class="nav-link text-body p-0">
                            Keluar <i class="fas fa-sign-out-alt"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <!-- End Navbar -->