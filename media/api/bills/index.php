<?php
$uploadDir = './img/';
$response = [];

// Allow from any origin
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['img'])) {
    $file = $_FILES['img'];

    if ($file['error'] === 0) {
        $filePath = $uploadDir . basename($file['name']);
        if (move_uploaded_file($file['tmp_name'], $filePath)) {
            $response['success'] = true;
            $response['message'] = 'File uploaded successfully.';
        } else {
            $response['success'] = false;
            $response['message'] = 'Error uploading file.';
        }
    } else {
        $response['success'] = false;
        $response['message'] = 'Error: ' . $file['error'];
    }
} else {
    $response['success'] = false;
    $response['message'] = 'Invalid request.';
}

header('Content-Type: application/json');
echo json_encode($response);
