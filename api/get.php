<?php
    include_once "db.php";
    header("Content-Type: application/json");
    session_start();
    function eq($conn, $query ,$p = []){
        $stmt = $conn->prepare($query);
        $stmt->execute($p);
        return $stmt->fetchAll(2);
    }