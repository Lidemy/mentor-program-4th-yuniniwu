<?php 
    session_start();
    require_once('conn.php');
    require_once('utils.php');

    $username = NULL;
    $user = NULL;
    if (!empty($_SESSION['username'])){
        $username = $_SESSION['username'];
        $user = getUserFromUsername($username);
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
  <title>Yuni 部落格 - 文章列表</title>
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

        <?php
            // 簡單權限管理：管理員才能看到下面這幾個按鈕
            if (isAdmin($user)) {
        ?>
        <div>
          <li><a href="edit.php">新增文章</a></li>
          <li><a href="admin.php">管理後台</a></li>
          <li><a href="handle_logout.php">登出</a></li>
        </div>
        <?php } ?>

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
    <div class="posts">
    <?php
        while($row = $result->fetch_assoc()){
    ?>
      <article class="post">
        <div class="post__header">
          <div><?php echo escape($row['title']);?></div>
          <?php
              // 簡單權限管理：管理員才能看到下面這個按鈕
              if (isAdmin($user)) {
          ?>
          <div class="post__actions">
            <a class="post__action" href="edit.php?id=<?php echo escape($row['id']);?>">編輯</a>
          </div>
          <?php } ?>
        </div>
        <div class="post__info">
          <?php echo escape($row['created_at']);?>
        </div>
        <div class="post__content"><?php echo escape($row['content']);?>
        </div>
      </article>
    <?php }?>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>