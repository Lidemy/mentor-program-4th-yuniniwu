<?php
    require_once("conn.php");

    function getUserFromUsername($username) {
        global $conn;
        $sql = "SELECT * FROM yuni_users WHERE username = ?"
        ;
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $username);
        $result = $stmt->execute();
        if(!$result) {
            die('Error:' . $conn_error);
        }
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        return $row; // id, username, nickname, role
    }

    // 用來防範 SQL Injection
    function escape($str) {
        return htmlspecialchars($str, ENT_QUOTES);
    }

    function isAdmin($user) {
        if ($user !== NULL) {
            return $user['role'] === 'ADMIN';
        }
        return false;
    }

    function generateToken($length) {
        $s = '';
        $tokenLength = $length;
        for ($i = 1; $i <= $tokenLength; $i++) {
            $s .= chr(rand(65, 90));
        }
        return $s;
    }  

?>