<?php 
    session_start();
    require_once('conn.php');
    require_once('utils.php');

    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
    // 簡單權限管理：管理員才能進到管理後台
    if (!isAdmin($user)) {
        header("Location: index.php");
        exit;
    }
    
    $sql = "SELECT * FROM yuni_blog_articles WHERE is_deleted = 'show' ORDER BY id DESC";
    $stmt = $conn->prepare($sql);
    $result = $stmt->execute();
    if (!$result) {
        die('Error:' . $conn_error);
    }
    $result = $stmt->get_result();
?>

<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="utf-8">
  <title>Yuni 部落格 - 管理後台</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="normalize.css" />
  <link rel="stylesheet" href="style.css" />
</head>

<body>
  <nav class="navbar">
    <div class="wrapper navbar__wrapper">
      <div class="navbar__site-name">
        <a href='index.php'>Who's Blog</a>
      </div>
      <ul class="navbar__list">
        <div>
          <li><a href="blog.php">文章列表</a></li>
          <li><a href="#">分類專區</a></li>
          <li><a href="#">關於我</a></li>
        </div>
        <div>
          <li><a href="edit.php">新增文章</a></li>
          <li><a href="handle_logout.php">登出</a></li>
        </div>
      </ul>
    </div>
  </nav>
  <section class="banner">
    <div class="banner__wrapper">
      <h1>存放技術之地</h1>
      <div>Welcome to my blog</div>
    </div>
  </section>
  <div class="container-wrapper">
    <div class="container">
      <div class="admin-posts">
      <?php
          while($row = $result->fetch_assoc()){
      ?>
        <div class="admin-post">
          <div class="admin-post__title">
            <?php echo escape($row['title']);?>
          </div>
          <div class="admin-post__info">
            <div class="admin-post__created-at">
              <?php echo escape($row['created_at']);?>
            </div>
            <a class="admin-post__btn" href="edit.php?id=<?php echo escape($row['id']);?>">
              編輯
            </a>
            <form method="POST" action="handle_delete.php">
              <!-- 用隱藏欄位加上 CSRF token -->
              <input type="hidden" name="csrftoken" value="<?php 
                  $csrftoken = $_COOKIE['csrftoken'];
                  echo $csrftoken; 
              ?>" />
              <!-- 用隱藏欄位帶上要刪除的資料 id -->
              <input type="hidden" name="id" value="<?php echo escape($row['id']);?>" />
              <input class="admin-post__btn" type="submit" name="deleteBTN" value="刪除" />
            </form>
          </div>
        </div>
      <?php }?>
      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>