<?php
    session_start();
    require_once("conn.php");
    require_once("utils.php");

    if (
        empty($_POST['id']) ||
        empty($_POST['title']) ||
        empty($_POST['content'])
    ) {
        header('Location: edit.php?errCode=1&id=' . $_POST['id']);
        die ('資料不齊全');
    }

    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
    $id = $_POST['id'];
    $title = $_POST['title'];
    $content = $_POST['content'];

    // 簡單權限管理：管理員才能編輯文章
    if (!isAdmin($user)) {
        header("Location: index.php");
        exit;
    }

    $sql = "UPDATE yuni_blog_articles SET title = ? ,content = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ssi' ,$title ,$content ,$id);
    $result = $stmt->execute();
    if (!$result) {
        die('Error:' . $conn_error);
    }
    
    // 編輯成功導回文章列表
    header('Location: blog.php');
?>