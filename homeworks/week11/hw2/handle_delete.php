<?php
    session_start();
    require_once("conn.php");
    require_once("utils.php");

    // 檢查是否為跨站 request
    if ($_POST["csrftoken"] !== $_COOKIE["csrftoken"]) {
        die('byebye hacker');
    }

    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
    // 簡單權限管理：管理員才能刪除文章
    if (!isAdmin($user)) {
        header("Location: index.php");
        exit;
    }

    if (!empty($_POST['id'])) {
        $id = intval($_POST['id']);
    }
    
    // 必須是文章作者才能刪文
    $sql = "UPDATE yuni_blog_articles SET is_deleted = 'hide' WHERE id = ? && username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('is', $id, $username);
    $result = $stmt->execute();
    if (!$result) {
        die('Error:' . $conn_error);
    }

    header('Location: admin.php');
    exit;
?>