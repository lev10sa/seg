<?php

// Allow from any origin
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require './vendor/autoload.php';

try {

        $name = $_POST['title'];
        $group = $_POST['group'];
        $wax = $_POST['start'];
        $way = $_POST['end'];
        $pname = $_POST['name'];
        $email = $_POST['email'];
        
        $body = "Halo <strong>" . $pname . "</strong>!<br><br>Terimakasih telah mendaftar untuk turut berpartisipasi dalam acara <strong>" . $name . "</strong>.<br><br>Silakan klik link di bawah ini untuk bergabung ke dalam grup yang telah kami sediakan, untuk informasi dan koordinasi acara lebih lanjut.<br><br>" . $group . "<br><br>Terimakasih.";

$grip = date("Y-m-d", strtotime($wax))."T".date("H:i:s", strtotime($wax));
 $gripp = date("Y-m-d", strtotime($way))."T".date("H:i:s", strtotime($way));
 $eventStart = date_create($grip, new DateTimeZone('Asia/Jakarta'));
 $eventEnd = date_create($gripp, new DateTimeZone('Asia/Jakarta'));

$icsContent = "BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTAMP:" . date('Ymd\THis') . "
DTSTART:".$eventStart->format('Ymd\THis')."
DTEND:".$eventEnd->format('Ymd\THis')."
SUMMARY:".$trn." - Konseling
DESCRIPTION:Jadwal dibuat oleh ".$fnm." untuk ditangani oleh ".$trn." perihal ".$tp.".
END:VEVENT
END:VCALENDAR";

        $mail = new PHPMailer(true);

        // Konfigurasi SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.hostinger.com'; // Ganti dengan server SMTP Anda
        $mail->SMTPAuth = true;
        $mail->Username = 'cs@compasspubindonesia.com'; // Ganti dengan alamat email Anda
        $mail->Password = 'CompassId2024!'; // Ganti dengan kata sandi email Anda
        $mail->SMTPSecure = 'ssl'; // Gunakan 'tls' atau 'ssl' sesuai kebutuhan
        $mail->Port = 465; // Port SMTP

        // Konfigurasi email
        $mail->setFrom('cs@compasspubindonesia.com', 'Compass Publishing Indonesia'); // Alamat email pengirim

        $mail->addAddress($email, $pname); // Alamat email penerima

        $mail->isHTML(true);
        $mail->Subject = $name . ": Registrasi Berhasil - " . $pname;
        $mail->Body = $body;

        // Kirim email
        $mail->send();
    

} catch (Exception $e) {
    print "Failed: " . $e->getMessage();
}
