<?php
  require_once('conn.php');
  require_once('utils.php');

  if (empty($_POST['comments'])) {
    header("Location: index.php?error_code=1");
    die();
  }

  $comment = $_POST['comments'];

  // get nickname
  $token = $_COOKIE['token'];
  $sql = sprintf(
    'SELECT username FROM yuni_tokens WHERE token = "%s"',
    $token
  );
  $result = $conn->query($sql);
  if(!$result) {
    die($conn->error);
  }
  $row = $result->fetch_assoc();
  $username = $row['username'];
  $user = getUserData($username);
  $nickname = $user['nickname'];

  // insert data into yuni_comments
  $sql = sprintf(
    'INSERT INTO yuni_comments (nickname, comment) VALUES("%s","%s")',
    $nickname,
    $comment
  );
  $result = $conn->query($sql);
  if (!$result) {
    die($conn->error);
  }

  header('Location: index.php');
?>