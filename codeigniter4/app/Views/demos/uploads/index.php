<!DOCTYPE html>
<html>
<head>
    <title>CodeIgniter Image Upload</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <div>
        <?php use CodeIgniter\HTTP\RequestInterface;
          $request = \Config\Services::request();
          $uri = $request->uri;
          $id = $uri->getSegment(3);
                if (isset($error)){
                    echo $error;
                }

            echo '<form method="post" action="/public/api/utils/upload/'.$id.'" enctype="multipart/form-data"><input type="file" id="files" name="file" size="33"/><input type="submit" value="Upload Image" /></form>'

          ?>
    </div>
</body>
</html>
