<?php
    session_start();
    require_once("conn.php");
    require_once("utils.php");

    // 檢查是否為跨站攻擊
    if ($_POST["csrftoken"] !== $_COOKIE["csrftoken"]) {
        die('byebye_hacker');
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
    
    $sql = "UPDATE yuni_blog_articles SET is_deleted = 'hide' WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);
    $result = $stmt->execute();
    if (!$result) {
        die('Error:' . $conn_error);
    }

    header('Location: admin.php');
?>