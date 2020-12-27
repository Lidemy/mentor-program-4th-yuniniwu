<?php
    session_start();
    require_once("conn.php");
    require_once("utils.php");

    if (
        empty($_POST['title']) ||
        empty($_POST['content'])
    ) {
        header('Location: edit.php');
        die ('資料不齊全');
    }

    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
    $title = $_POST['title'];
    $content = $_POST['content'];

    // 簡單權限管理：管理員才能新增文章
    if (!isAdmin($user)) {
        header("Location: index.php");
        exit;
    }

    $sql = "INSERT INTO yuni_blog_articles (title ,content ,username) VALUES (? ,? ,?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sss' ,$title , $content, $username);
    $result = $stmt->execute();
    if (!$result) {
        die('Error:' . $conn_error);
    }
    
    // 編輯成功導回文章列表
    header('Location: blog.php');
    exit;
?>