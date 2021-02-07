<?php
  require_once('conn.php');
  // 加上 Content-type, browser 才知道要輸出 json 格式的資料
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  // 錯誤處理
  if (
    empty($_GET['site_key'])
  ) {
    $json = array(
      "ok" => false,
      "message" => "Please input site_key in URL"
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  // 拿資料
  $site_key = $_GET['site_key'];

  // 從資料庫拿出 site_key 對應的留言內容，如果 $_GET['cursor_id'] 有值，則加上 id 小於 cursor id 的條件
  $sql = "SELECT id, content, nickname, created_at " .
  "FROM yuni_discussions WHERE site_key = ? " .
  (empty($_GET['cursor_id']) ? "" : "and id < ? ") .
  "ORDER BY ID DESC LIMIT 5";

  $stmt = $conn->prepare($sql);
  
  if(empty($_GET['cursor_id'])){
    $stmt->bind_param('s', $site_key);
  } else {
    $stmt->bind_param('si', $site_key, $_GET['cursor_id']);
  }
  
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
  $discussions = array();
  while($row = $result->fetch_assoc()) {
    array_push($discussions, array(
      "id" => $row['id'],
      "nickname" => $row['nickname'],
      "content" => $row['content'],
      "created_at" => $row['created_at']
    ));
  }

  $json = array(
    "ok" => true,
    "discussions" => $discussions
  );
  $response = json_encode($json);
  echo $response;
?>