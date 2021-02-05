<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');
  
  if (
    empty($_POST['content']) ||
    empty($_POST['id'])
  ) {
    $json = array(
      "ok" => false,
      "message" => "Please input missing data"
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  // 拿資料
  $content = $_POST['content'];
  $id = $_POST['id'];

  // 寫入資料庫
  $sql = "UPDATE yuni_todos SET content = ? WHERE id = $id";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $content);
  $result = $stmt->execute();

  if(!$result) {
    $json = array(
      "ok" => false,
      "message" => $conn->error
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  $json = array(
    "ok" => true,
    "message" => "success",
    "id" => $id
  );
  $response = json_encode($json);
  echo $response;
?>