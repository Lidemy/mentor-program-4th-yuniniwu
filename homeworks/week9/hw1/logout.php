<?php
  require_once('conn.php');

  $token = $_COOKIE['token'];
  $sql = sprintf(
    'DELETE FROM yuni_tokens WHERE token = "%s"',
    $token
  );
  $result = $conn->query($sql);
  
  setcookie("token", "", time() - 3600);
  header("Location: index.php");
?>