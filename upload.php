<?php
require_once __DIR__ . '/config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Only POST allowed']);
    exit;
}

$allowedTypes = ['teacher' => 'teachers', 'student' => 'students', 'admin' => 'admins'];
$typeKey = $_POST['type'] ?? null;
$id = isset($_POST['id']) ? intval($_POST['id']) : 0;

if (!$typeKey || !$id || !array_key_exists($typeKey, $allowedTypes)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing or invalid type/id']);
    exit;
}

if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['error' => 'No image uploaded or upload error']);
    exit;
}

$file = $_FILES['image'];
$maxSize = 5 * 1024 * 1024; // 5MB
if ($file['size'] > $maxSize) {
    http_response_code(400);
    echo json_encode(['error' => 'File too large']);
    exit;
}

$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mime = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);
$allowedMimes = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp'];
if (!array_key_exists($mime, $allowedMimes)) {
    http_response_code(400);
    echo json_encode(['error' => 'Unsupported image type']);
    exit;
}

$ext = $allowedMimes[$mime];
$uploadsDir = __DIR__ . '/uploads';
if (!is_dir($uploadsDir)) mkdir($uploadsDir, 0755, true);

$filename = sprintf('%s_%d_%d.%s', $typeKey, $id, time(), $ext);
$destination = $uploadsDir . '/' . $filename;

if (!move_uploaded_file($file['tmp_name'], $destination)) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to move uploaded file']);
    exit;
}

$table = $allowedTypes[$typeKey];
$safeFilename = mysqli_real_escape_string($conn, $filename);
$id = intval($id);

$sql = "UPDATE `{$table}` SET `image` = '{$safeFilename}' WHERE id = {$id} LIMIT 1";
if (!mysqli_query($conn, $sql)) {
    http_response_code(500);
    echo json_encode(['error' => 'Database update failed', 'details' => mysqli_error($conn)]);
    exit;
}

echo json_encode(['success' => true, 'filename' => $filename, 'url' => "get_image.php?type={$typeKey}&id={$id}"]);

?>
