<?php

class CommonController
{
  public function index()
  {
    $service = new Service();
    $request = $this->request;
    $response = $this->response;
    $method = $request->getMethod();
    $json = $request->getJSON();

    switch ($method) {
        case 'post':
            $item = $service->saveitem($json);
            return $response->setJSON($item);
            break;
        case 'get':
            $items = $service->getitems();
            return $response->setJSON($items);
            break;
        default:
            echo "nothing here!";
    }
  }

  public function id($id)
  {
    $service = new Service();
    $request = $this->request;
    $response = $this->response;
    $method = $request->getMethod();
    $json = $request->getJSON();

    switch ($method) {
        case 'get':
            $item = $service->getitem($id);
            return $response->setJSON($item);
            break;
        default:
            echo "nothing here!";
    }
  }

  public function delete($id)
  {
    $service = new Service();
    $request = $this->request;
    $response = $this->response;
    $method = $request->getMethod();

    switch ($method) {
        case 'post':
            $item = $service->deleteitemById($id);
            return $response->setJSON($item);
            break;
        default:
            echo "nothing here!";
    }
  }
}
