<?php
  require_once('conn.php');
  require_once('utils.php');

  if (empty($_POST['username']) || empty($_POST['password'])) {
    header("Location: login.php?error_code=1");
    die();
  }

  $username = $_POST['username'];
  $password = $_POST['password'];

  $sql = sprintf(
    'SELECT * FROM yuni_users WHERE username = "%s" and password = "%s"',
    $username,
    $password
  );
  $result = $conn->query($sql);

  if ($result->num_rows) {

    // log in sucessfully, set cookie
    $token = generateToken();
    $expire = time() + 3600;
    setcookie("token", $token, $expire);

    // store token into DB
    $sql = sprintf(
      'INSERT INTO yuni_tokens (username, token) VALUES ("%s", "%s")',
      $username,
      $token
    );
    $result = $conn->query($sql);
    if(!$result) {
      die($conn->error);
    }

    header("Location: index.php");
  } else {
    header("Location: login.php?error_code=2");
    die();
  }
?>