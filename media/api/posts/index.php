<?php

$uploadDir = './img/';
$response = [];

// Allow from any origin
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $file = "";

    if ($_FILES['banner']) {
        $file = $_FILES['banner'];
    } else if ($_FILES['fileList']) {
        $file = $_FILES['fileList'];
    }

    $allowed_image_extensions = ['png', 'jpg', 'jpeg', 'gif'];
    $upload_errors = [];

    $total_files = count($file['name']);

    for ($i = 0; $i < $total_files; $i++) {
        $file_name = $file['name'][$i];
        $file_size = $file['size'][$i];
        $file_tmp_name = $file['tmp_name'][$i];
        $file_type = $file['type'][$i];
        $file_error = $file['error'][$i];

        // Check for errors (0 = no error, UPLOAD_ERR_INI_SIZE, etc.)
        if ($file_error !== UPLOAD_ERR_OK) {
            $upload_errors[] = "Error uploading file: $file_name (Error code: $file_error)";
            continue; // Skip to the next file if there's an error
        }

        // Check file size limit (optional)
        if ($file_size > 10000000) { // Adjust limit in bytes as needed (e.g., 500000 for 500 KB)
            $upload_errors[] = "File '$file_name' exceeds the maximum file size limit.";
            continue;
        }

        // Check allowed extensions (optional)
        $file_ext = pathinfo($file_name, PATHINFO_EXTENSION);
        if (!in_array($file_ext, $allowed_image_extensions)) {
            $upload_errors[] = "Invalid file type for '$file_name'. Only allowed extensions are: " . implode(', ', $allowed_image_extensions);
            continue;
        }

        // Generate a unique filename (optional but recommended for security and avoiding overwrites)
        $new_file_name = uniqid('', true) . '.' . $file_ext;

        // Upload the file
        if (move_uploaded_file($file_tmp_name, $uploadDir . $new_file_name)) {
            echo "File '$file_name' uploaded successfully as '$new_file_name'.<br>";
        } else {
            $upload_errors[] = "Error uploading file: $file_name";
        }
    }
}

header('Content-Type: application/json');
echo json_encode($response);
