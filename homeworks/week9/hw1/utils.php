<?php
  require_once('conn.php');

  // generate random token 
  function generateToken() {
    $token = '';
    for ($i = 0; $i < 16; $i++) {
      $token .= chr(rand(65,90));
    }
    return $token;
  }

  // query userdata via username. to-do : via nickname
  function getUserData($username) {
    global $conn;
    $sql = sprintf(
      'SELECT * FROM yuni_users WHERE username = "%s"',
      $username
    );

    $result = $conn->query($sql);
    if (!$result) {
      die($conn->error);
    }
    $row = $result->fetch_assoc();
    return $row;
  }
?>