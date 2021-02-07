<?php
  require_once('conn.php');
  // browser 才知道要輸出 json 格式的資料
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');
  
  // 錯誤處理
  if (
    empty($_POST['content']) ||
    empty($_POST['nickname']) ||
    empty($_POST['site_key'] ) 
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
  $nickname = $_POST['nickname'];
  $site_key = $_POST['site_key'];

  // 寫入資料庫
  $sql = "INSERT INTO yuni_discussions (content, nickname, site_key) VALUES (?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $content, $nickname, $site_key);
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
    "message" => "success"
  );
  $response = json_encode($json);
  echo $response;
?>