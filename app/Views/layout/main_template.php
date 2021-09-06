<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="apple-touch-icon" sizes="76x76" href="<?= base_url('assets/img/apple-icon.png'); ?>">
    <link rel="icon" type="image/png" href="<?= base_url('assets/img/favicon.ico'); ?>">
    <title>
        <?= $title; ?>
    </title>
    <!--     Fonts and icons     -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
    <!-- Nucleo Icons -->
    <link href="<?= base_url(); ?>assets/css/nucleo-icons.css" rel="stylesheet" />
    <link href="<?= base_url(); ?>assets/css/nucleo-svg.css" rel="stylesheet" />
    <!-- Font Awesome Icons -->
    <script src="https://kit.fontawesome.com/42d5adcbca.js" crossorigin="anonymous"></script>
    <link href="<?= base_url('assets/vendor/fontawesome-free/css/all.min.css'); ?>" rel="stylesheet">
    <link href="<?= base_url('assets/css/nucleo-svg.css'); ?>" rel="stylesheet" />
    <!-- CSS Files -->
    <link id="pagestyle" href="<?= base_url('assets/css/soft-ui-dashboard.css?v=1.0.3'); ?>" rel="stylesheet" />

</head>

<body class="g-sidenav-show  bg-gray-100">

    <!-- Sidebar -->

    <?php echo view('layout/side'); ?>

    <!-- Main -->

    <?php echo view('layout/main'); ?>

    <!-- config template -->
    <?php echo view('layout/config_template'); ?>

    <!--   Core JS Files   -->
    <script src="<?= base_url('assets/js/core/popper.min.js'); ?>"></script>
    <script src="<?= base_url('assets/js/core/bootstrap.min.js'); ?>"></script>
    <script src="<?= base_url('assets/js/plugins/perfect-scrollbar.min.js'); ?>"></script>
    <script src="<?= base_url('assets/js/plugins/smooth-scrollbar.min.js'); ?>"></script>
    <script src="<?= base_url('assets/js/plugins/chartjs.min.js'); ?>"></script>

    <!-- Resources -->
    <script src="https://cdn.amcharts.com/lib/4/core.js"></script>
    <script src="https://cdn.amcharts.com/lib/4/maps.js"></script>
    <script src="https://cdn.amcharts.com/lib/4/geodata/indonesiaLow.js"></script>
    <script src="https://cdn.amcharts.com/lib/4/themes/animated.js"></script>

    <script>
        var win = navigator.platform.indexOf('Win') > -1;
        if (win && document.querySelector('#sidenav-scrollbar')) {
            var options = {
                damping: '0.5'
            }
            Scrollbar.init(document.querySelector('#sidenav-scrollbar'), options);
        }
    </script>
    <!-- Github buttons -->
    <script async defer src="https://buttons.github.io/buttons.js"></script>
    <!-- Control Center for Soft Dashboard: parallax effects, scripts for the example pages etc -->
    <script src="<?= base_url(); ?>assets/js/soft-ui-dashboard.min.js?v=1.0.3"></script>

    <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
    <script type="text/javascript">
        $('.common_class li').click(function() {
            $('.common_class li').removeClass('active');
            $(this).addClass('active');
        })
    </script>


    <!-- Styles -->
    <style>
        #chartdiv {
            width: 100%;
            height: 300px;
            overflow: hidden;
        }
    </style>

    <!-- Chart code -->
    <script>
        am4core.ready(function() {

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            // Create map instance
            var chart = am4core.create("chartdiv", am4maps.MapChart);

            // Set map definition
            chart.geodata = am4geodata_indonesiaLow;

            // Set projection
            chart.projection = new am4maps.projections.Miller();

            // Create map polygon series
            var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

            // Exclude Antartica
            polygonSeries.exclude = ["AQ"];

            // Make map load polygon (like country names) data from GeoJSON
            polygonSeries.useGeodata = true;

            // Configure series
            var polygonTemplate = polygonSeries.mapPolygons.template;
            polygonTemplate.tooltipText = "{name}";
            polygonTemplate.polygon.fillOpacity = 0.6;


            // Create hover state and set alternative fill color
            var hs = polygonTemplate.states.create("hover");
            hs.properties.fill = chart.colors.getIndex(0);

            // Add image series
            var imageSeries = chart.series.push(new am4maps.MapImageSeries());
            imageSeries.mapImages.template.propertyFields.longitude = "longitude";
            imageSeries.mapImages.template.propertyFields.latitude = "latitude";
            imageSeries.mapImages.template.tooltipText = "{title}";
            imageSeries.mapImages.template.propertyFields.url = "url";

            var circle = imageSeries.mapImages.template.createChild(am4core.Circle);
            circle.radius = 3;
            circle.propertyFields.fill = "color";

            var circle2 = imageSeries.mapImages.template.createChild(am4core.Circle);
            circle2.radius = 3;
            circle2.propertyFields.fill = "color";


            circle2.events.on("inited", function(event) {
                animateBullet(event.target);
            })


            function animateBullet(circle) {
                var animation = circle.animate([{
                    property: "scale",
                    from: 1,
                    to: 5
                }, {
                    property: "opacity",
                    from: 1,
                    to: 0
                }], 1000, am4core.ease.circleOut);
                animation.events.on("animationended", function(event) {
                    animateBullet(event.target.object);
                })
            }

            var colorSet = new am4core.ColorSet();

            imageSeries.data = [{
                    "title": "BPP Jombang",
                    "latitude": -6.2893272,
                    "longitude": 106.6944967,
                    "color": colorSet.next()
                },
                {
                    "title": "BPP Ragunan",
                    "latitude": -6.2956309,
                    "longitude": 106.8160762,
                    "color": colorSet.next()
                },
                {
                    "title": "BPPK Lembang",
                    "latitude": -6.5130159,
                    "longitude": 106.8843142,
                    "color": colorSet.next()
                },
                {
                    "title": "BPP Rantau Pauh",
                    "latitude": 4.302686,
                    "longitude": 98.0829409,
                    "color": colorSet.next()
                }
            ];

            // Zoom control
            chart.zoomControl = new am4maps.ZoomControl();

            var homeButton = new am4core.Button();
            homeButton.events.on("hit", function() {
                //   polygonSeries.show();
                //   countrySeries.hide();
                chart.goHome();
            });

            homeButton.icon = new am4core.Sprite();
            homeButton.padding(7, 5, 7, 5);
            homeButton.width = 30;
            homeButton.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
            homeButton.marginBottom = 10;
            homeButton.parent = chart.zoomControl;
            homeButton.insertBefore(chart.zoomControl.plusButton);

        }); // end am4core.ready()
    </script>

    <script>
        $("#lokasikerja").change(function() {
            if ($(this).val() == "kabupaten") {
                $('#kecamatan1Div').show();
                $('#kecamatan1').attr('required', '');
                $('#kecamatan1').attr('data-error', 'This field is required.');
                $('#kecamatan2Div').show();
                $('#kecamatan2').attr('required', '');
                $('#kecamatan2').attr('data-error', 'This field is required.');

                // } else if ($(this).val() == "selasa") {
                //     $('#selasaDiv').show();
                //     $('#selasa').attr('required', '');
                //     $('#selasa').attr('data-error', 'This field is required.');
                // } else if ($(this).val() == "rabu") {
                //     $('#rabuDiv').show();
                //     $('#rabu').attr('required', '');
                //     $('#rabu').attr('data-error', 'This field is required.');
                // } else if ($(this).val() == "kamis") {
                //     $('#kamisDiv').show();
                //     $('#kamis').attr('required', '');
                //     $('#kamis').attr('data-error', 'This field is required.');
                // } else if ($(this).val() == "jumat") {
                //     $('#jumatDiv').show();
                //     $('#jumat').attr('required', '');
                //     $('#jumat').attr('data-error', 'This field is required.');
                // } else if ($(this).val() == "sabtu") {
                //     $('#sabtuDiv').show();
                //     $('#sabtu').attr('required', '');
                //     $('#sabtu').attr('data-error', 'This field is required.');
                // } else if ($(this).val() == "minggu") {
                //     $('#mingguDiv').show();
                //     $('#minggu').attr('required', '');
                //     $('#minggu').attr('data-error', 'This field is required.');
            } else {
                $('#kecamatan1Div').hide();
                $('#kecamatan1').removeAttr('required');
                $('#kecamatan1').removeAttr('data-error');
                $('#kecamatan2Div').hide();
                $('#kecamatan2').removeAttr('required');
                $('#kecamatan2').removeAttr('data-error');
                // $('#rabuDiv').hide();
                // $('#rabu').removeAttr('required');
                // $('#rabu').removeAttr('data-error');
                // $('#kamisDiv').hide();
                // $('#kamis').removeAttr('required');
                // $('#kamis').removeAttr('data-error');
                // $('#jumatDiv').hide();
                // $('#jumat').removeAttr('required');
                // $('#jumat').removeAttr('data-error');
                // $('#sabtuDiv').hide();
                // $('#sabtu').removeAttr('required');
                // $('#sabtu').removeAttr('data-error');
                // $('#mingguDiv').hide();
                // $('#minggu').removeAttr('required');
                // $('#minggu').removeAttr('data-error');
            }
        });
        $("#lokasikerja").trigger("change");
    </script>
</body>

</html>