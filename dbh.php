<?php

$dsn = "mysql:host=localhost;dbname=multiplication";
$dbusername = "root";
$dbpassword = "";

try {
    $pdo = new PDO($dsn, $dbusername, $dbpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = file_get_contents('db.sql');
    $pdo->exec($sql);

    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['points']) && isset($_POST['date']) && isset($_POST['category'])) {
        $points = $_POST['points'];
        $date = $_POST['date'];
        $category = $_POST['category'];
        $stmt = $pdo->prepare("INSERT INTO dane (points, date, category) VALUES (:points, :date, :category)");
        $stmt->bindParam(':points', $points);
        $stmt->bindParam(':date', $date);
        $stmt->bindParam(':category', $category);
        $stmt->execute();
    }

    if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['category'])) {
        $category = $_GET['category'];
        $stmt = $pdo->prepare("SELECT * FROM dane WHERE category = :category");
        $stmt->bindParam(':category', $category);
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        header('Content-Type: application/json');
        echo json_encode($results);
    } else {
        $stmt = $pdo->query("SELECT * FROM dane");
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        header('Content-Type: application/json');
        echo json_encode($results);
    }

} catch (PDOException $e) {
    echo "connection failed: " . $e->getMessage();
}

$pdo = null;
?>
