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

    // 必須是文章作者才能編輯文章
    $sql = "UPDATE yuni_blog_articles SET title = ? ,content = ? WHERE id = ? && username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ssis', $title, $content, $id, $username);
    $result = $stmt->execute();
    if (!$result) {
        die('Error:' . $conn_error);
    }
    
    // 編輯成功導回文章列表
    header('Location: blog.php');
    exit;
?>