<?php
$conn = mysqli_connect("localhost", "root", "", "smart_school_db");

if (!$conn) {
    die("Database connection failed: " . mysqli_connect_error());
}
?>
