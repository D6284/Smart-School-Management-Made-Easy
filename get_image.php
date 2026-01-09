<?php
require_once __DIR__ . '/config.php';

$typeKey = $_GET['type'] ?? null;
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;
$allowedTypes = ['teacher' => 'teachers', 'student' => 'students', 'admin' => 'admins'];

if (!$typeKey || !$id || !array_key_exists($typeKey, $allowedTypes)) {
    http_response_code(400);
    echo 'Bad request';
    exit;
}

$table = $allowedTypes[$typeKey];
$id = intval($id);

$sql = "SELECT image FROM `{$table}` WHERE id = {$id} LIMIT 1";
$res = mysqli_query($conn, $sql);
if (!$res || mysqli_num_rows($res) === 0) {
    // redirect to placeholder
    $placeholder = getPlaceholderUrl($typeKey);
    header('Location: ' . $placeholder);
    exit;
}

$row = mysqli_fetch_assoc($res);
$filename = $row['image'];
if (!$filename) {
    header('Location: ' . getPlaceholderUrl($typeKey));
    exit;
}

$filePath = __DIR__ . '/uploads/' . $filename;
if (!file_exists($filePath)) {
    header('Location: ' . getPlaceholderUrl($typeKey));
    exit;
}

$mime = mime_content_type($filePath) ?: 'application/octet-stream';
header('Content-Type: ' . $mime);
header('Content-Length: ' . filesize($filePath));
readfile($filePath);
exit;

function getPlaceholderUrl($typeKey) {
    switch ($typeKey) {
        case 'teacher':
            return 'https://images.unsplash.com/photo-1549187774-b4e9b0445b44?auto=format&fit=crop&w=400&q=60';
        case 'student':
            return 'https://images.unsplash.com/photo-1532009324734-20a7a5813719?auto=format&fit=crop&w=400&q=60';
        case 'admin':
        default:
            return 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&q=60';
    }
}

?>
