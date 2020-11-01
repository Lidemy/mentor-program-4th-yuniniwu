<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
  <title>登入頁面</title>
</head>
<body class="outline_debug">
  <header>
    <div class="wrapper">
    本站為練習使用，註冊時請勿使用任何真實的帳號密碼！！！
    </div>
  </header>
  <main>
    <div class="wrapper">
      <section class="user_action register_info">
        <div class="account">
          <a class="btn" href="index.php">回留言板</a>
          <a class="btn" href="register.php">註 冊</a>
        </div>
        <h4>請輸入登入資料</h4>
        
        <!-- alert input-related error message -->
        <?php
          $error_message = '';
          if (!empty($_GET['error_code'])) {
            if ($_GET['error_code'] === '1') {
              $error_message = '不能送出空白內容，請輸入帳號密碼';
            } else if ($_GET['error_code'] === '2') {
              $error_message = '帳號或密碼有誤，請重新輸入';
            }
            echo '<h4 class="error_message">' . $error_message .'</h4>';
          }
        ?>

        <form method ='POST' action="handle_login.php">
          <div class="input_item">
            <label for="username">
              帳號：<input type="text" name="username" required>
            </label>
          </div>
          <div class="input_item">
            <label for="password">
              密碼：<input type="password" name="password" required>
            </label>
          </div>
          <input class="btn" type="submit" value="送 出">
        </form>
      </section>
    </div>
  </main>  
</body>
</html>