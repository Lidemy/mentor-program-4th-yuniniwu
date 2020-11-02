<?php
  require_once('conn.php');

  if (
    empty($_POST['username'])||
    empty($_POST['password'])||
    empty($_POST['nickname'])
  ) {
    header("Location: login.php?error_code=1");
    die();
  }

  $username = $_POST['username'];
  $password = $_POST['password'];
  $nickname = $_POST['nickname'];

  $sql = sprintf(
    'INSERT INTO yuni_users (username ,password, nickname) VALUES("%s", "%s", "%s")',
    $username,
    $password,
    $nickname
  );
  $result = $conn->query($sql);

  if (!$result) {
    $sql_error_number = $conn->errno;
    if ($sql_error_number = "1062") {
      header('Location: register.php?reminder=2');
    }
    die($conn->error);
  }

  header('Location: register.php?reminder=1');
?>