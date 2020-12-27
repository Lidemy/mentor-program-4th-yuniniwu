<?php 
    session_start();
    require_once('conn.php');
    require_once('utils.php');

    $id = NULL;
    if (!empty($_GET['id'])) {
      $id = intval($_GET['id']);
    } 

    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
    // 簡單權限管理：管理員才能編輯文章
    if (!isAdmin($user)) {
        header("Location: index.php");
        exit;
    }

    $sql = "SELECT * FROM yuni_blog_articles WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);
    $result = $stmt->execute();
    if (!$result) {
        die('Error:' . $conn_error);
    }
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
?>

<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="utf-8">

  <title>Yuni 部落格 - 編輯文章</title>
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
          <li><a href="admin.php">管理後台</a></li>
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
      <div class="edit-post">
        <!-- 判斷是新增文章還是編輯文章 -->
        <?php 
            /*
            下面這裡如果不用 if else 只用 if 的話，需要注意順序：
            如果寫成下面這樣的話，$action 永遠只會導到 handle_edit.php  

            if (empty($_GET['id']) && isAdmin($user)) {
                $action = "handle_add_article.php";
            } 
            $action = "handle_edit.php";
            */
            $action = "handle_edit.php";
            if (empty($_GET['id']) && isAdmin($user)) {
                $action = "handle_add_article.php";
            } 
        ?>
        <form 
        action="<?php echo $action;?>" 
        method="POST">
          <div class="edit-post__title">
            發表文章：
          </div>
          <div class="edit-post__input-wrapper">
            <input 
              class="edit-post__input" 
              placeholder="請輸入文章標題" 
              value="<?php
                    if (!empty($_GET['id'])) {
                        echo escape($row['title']);
                    }
                ?>" 
              name="title"
            />
          </div>
          <div class="edit-post__input-wrapper">
            <textarea rows="20" class="edit-post__content" name="content"><?php
                  if (!empty($_GET['id'])) {
                      echo escape($row['content']);
                  }
              ?></textarea>
          </div>
          <!-- 加上隱藏的 input 欄位，用來把 id 帶到下一個頁面（handle_edit.php） -->
          <input type="hidden" name="id" value="<?php
                  if (!empty($_GET['id'])) {
                      echo escape($row['id']);
                  }
              ?>">
          <div class="edit-post__btn-wrapper">
              <input type="submit" class="edit-post__btn" value="送出"/>
          </div>
        </form>
      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>