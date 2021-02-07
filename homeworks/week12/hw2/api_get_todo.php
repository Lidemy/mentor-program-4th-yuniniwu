<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if (
    empty($_GET['id'])
  ) {
    $json = array(
      "ok" => false,
      "message" => "Please input id in URL"
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  // 拿資料
  $id = intval($_GET['id']);

  $sql = "SELECT id, content FROM yuni_todos WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
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

  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  $json = array(
    "ok" => true,
    "data" => array(
      "id" => $row['id'],
      "todo" => $row['content']
    )
  );

  $response = json_encode($json);
  echo $response;
?>