<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
  <title>註冊頁面</title>
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
          <a class="btn" href="login.php">登 入</a>
        </div>
        <!-- kindly remind message -->
        <?php
          if (!empty($_GET['reminder'])) {
            $reminder = '';
            if ($_GET['reminder'] === '1') {
              $reminder = '已成功註冊，請進行登入即可留言';
              echo '<h3>' . $reminder . '</h3>';
            } else if ($_GET['reminder'] === '2') {
              $reminder = '帳號或暱稱已被使用，請重新輸入';
              echo '<h3 class="error_message">' . $reminder . '</h3>';
            }
          }
        ?>

        <h4>請輸入註冊資料</h4>
        <form method ='POST' action="handle_register.php">
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
          <div class="input_item">
            <label for="nickname">
              暱稱：<input type="text" name="nickname" required>
            </label>
          </div>
          <input class="btn" type="submit" value="送 出">
        </form>
      </section>

    </div>
  </main>
  
</body>
</html>