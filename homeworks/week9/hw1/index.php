<?php
  require_once('conn.php');
  require_once('utils.php');
?>

<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
  <title>留言板 3.0</title>
</head>
<body>
  <header>
    <div class="wrapper">
    本站為練習使用，註冊時請勿使用任何真實的帳號密碼！！！
    </div>
  </header>
  <main>
    <div class="wrapper">
      <section class="user_action">
        <?php
          $username = NULL;

          // if token is not empty, get username and nickname
          if(!empty($_COOKIE['token'])){
            $token = $_COOKIE['token'];
            $sql = sprintf(
              'SELECT * FROM yuni_tokens WHERE token = "%s"',
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
          }
          if (!$username) {
        ?>
          <!-- layout before login -->
          <div class="account">
            <a class="btn" href="register.php">註 冊</a>
            <a class="btn" href="login.php">登 入</a>
          </div>
        <?php
          } else {
        ?>
          <!-- layout after login -->
          <div class="account">
            <a class="btn" href="logout.php">登 出</a>
          </div>
          <h4>Hi <?php echo $nickname;?></h4>

          <!-- alert input-related error message -->
          <?php
            if (!empty($_GET['error_code'])) {
              $error_message = '';
              if ($_GET['error_code'] === '1') {
                $error_message = '不能送出空白內容，請輸入留言';
              }
              echo '<h4 class="error_message">' . $error_message .'</h4>';
            }
          ?>

          <form method ='POST' action="handle_add_comments.php">
            <textarea name="comments" cols="30" rows="5" placeholder="來留言吧" required></textarea>
            <input class="btn" type="submit" value="送 出">
          </form>
        <?php
          }
        ?>
      </section>
      <section class="comments_display">
        <?php
          $sql = 'SELECT * FROM yuni_comments ORDER BY id DESC';
        
          $result = $conn->query($sql);
          if (!$result) {
            die($conn->error);
          }

          while($row = $result->fetch_assoc()) {
        ?>
          <div class="comment_item">
            <div class="avatar">
              <img src="https://picsum.photos/50/50/?random=1">
            </div>
            <div class="comment_detail">
              <div class="comment_who">
                <div class="nickname">
                  <?php echo $row['nickname'];?>
                </div>
                <div class="timestamp">
                  <?php echo $row['created_at'];?>
                </div>
              </div>
              <div class="comment_content">
                <?php echo $row['comment'];?>
              </div>
            </div>
          </div>
        <?php
          }
        ?>
        <div class="notice">-  已經到底囉！  -</div>
      </section>
    </div>
  </main>
</body>
</html>