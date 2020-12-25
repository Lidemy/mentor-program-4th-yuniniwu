<?php
    session_start();
    require_once("conn.php");
    require_once("utils.php");

    if (
      empty($_POST['username']) ||
      empty($_POST['password'])
    ) {
      header('Location: login.php?errCode=1');
      die();
    }

    $username = $_POST['username'];
    $password = $_POST['password'];

    // 撈出資料庫裡符合 username 的那一筆資料
    $sql = 'SELECT * FROM yuni_users WHERE username = ?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $result = $stmt->execute();
    if (!$result) {
      die($conn->error);
    }
    $result = $stmt->get_result();

    // 如果一個資料都拿不到，代表 username 不存在
    if ($result->num_rows === 0){
      header('Location: login.php?errCode=2');
      exit();
    }

    // 產生 CSRF token
    $csrftoken = generateToken(10);
    setcookie("csrftoken", $csrftoken, time() + 3600 * 24, "/");

    // 如果有拿到一筆資料，再比對密碼是不是一樣，是的話就導回首頁，把 user 存到 $_SESSION
    $row = $result->fetch_assoc();
    if(password_verify($password, $row['password'])){
        $_SESSION['username'] = $username;
        header('Location: index.php');
    } else {
        header('Location: login.php?errCode=2');
        die();
    }
?>