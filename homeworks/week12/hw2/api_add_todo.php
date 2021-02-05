<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');
  
  if (
    empty($_POST['content'])
  ) {
    $json = array(
      "ok" => false,
      "message" => "Please input missing fields"
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  // 拿資料
  $content = $_POST['content'];

  // 寫入資料庫
  $sql = "INSERT INTO yuni_todos (content) VALUES (?)";
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
    "id" => $conn->insert_id
  );
  $response = json_encode($json);
  echo $response;
?>