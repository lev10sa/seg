<?php

$uploadDir = './img/';
$response = [];

// Allow from any origin
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $file = null;

    if (isset($_FILES['banner'])) {
        $file = $_FILES['banner'];
        if ($file) {
            $allowed_image_extensions = ['png', 'jpg', 'jpeg', 'gif', 'webp'];
            $upload_errors = [];
            $uploaded_files = [];

            // Handle both single and multiple file uploads
            $total_files = is_array($file['name']) ? count($file['name']) : 1;

            for ($i = 0; $i < $total_files; $i++) {
                // Handling both single and multiple files
                $file_name = is_array($file['name']) ? $file['name'][$i] : $file['name'];
                $file_size = is_array($file['size']) ? $file['size'][$i] : $file['size'];
                $file_tmp_name = is_array($file['tmp_name']) ? $file['tmp_name'][$i] : $file['tmp_name'];
                $file_type = is_array($file['type']) ? $file['type'][$i] : $file['type'];
                $file_error = is_array($file['error']) ? $file['error'][$i] : $file['error'];

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

                // Upload the file
                if (move_uploaded_file($file_tmp_name, $uploadDir . basename($file_name))) {
                    $uploaded_files[] = "File '$file_name' uploaded successfully as '$file_name'.";
                } else {
                    $upload_errors[] = "Error uploading file: $file_name";
                }
            }

            $response['errors'] = $upload_errors;
            $response['uploaded_files'] = $uploaded_files;
        } else {
            $response['errors'] = ['No files were uploaded.'];
        }
    }

    if (isset($_FILES['fileList'])) {
        $file = $_FILES['fileList'];
        if ($file) {
            $allowed_image_extensions = ['png', 'jpg', 'jpeg', 'gif', 'webp'];
            $upload_errors = [];
            $uploaded_files = [];

            // Handle both single and multiple file uploads
            $total_files = is_array($file['name']) ? count($file['name']) : 1;

            for ($i = 0; $i < $total_files; $i++) {
                // Handling both single and multiple files
                $file_name = is_array($file['name']) ? $file['name'][$i] : $file['name'];
                $file_size = is_array($file['size']) ? $file['size'][$i] : $file['size'];
                $file_tmp_name = is_array($file['tmp_name']) ? $file['tmp_name'][$i] : $file['tmp_name'];
                $file_type = is_array($file['type']) ? $file['type'][$i] : $file['type'];
                $file_error = is_array($file['error']) ? $file['error'][$i] : $file['error'];

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

                // Upload the file
                if (move_uploaded_file($file_tmp_name, $uploadDir . basename($file_name))) {
                    $uploaded_files[] = "File '$file_name' uploaded successfully as '$file_name'.";
                } else {
                    $upload_errors[] = "Error uploading file: $file_name";
                }
            }

            $response['errors'] = $upload_errors;
            $response['uploaded_files'] = $uploaded_files;
        } else {
            $response['errors'] = ['No files were uploaded.'];
        }
    }
} else {
    $response['errors'] = ['Invalid request method.'];
}

header('Content-Type: application/json');
echo json_encode($response);
