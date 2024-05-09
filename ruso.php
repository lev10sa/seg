

<?php

date_default_timezone_set("Asia/Jakarta");

session_start();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require './vendor/autoload.php';

if (isset($_POST['name'])) {

    $name = $_POST['title'];
    $group = $_POST['group'];
    $pname = $_POST['name'];
    $email = $_POST['email'];
    $start =
        $_POST['start'];
    $end =
        $_POST['end'];
    $body = `Halo ` . $pname . `!
<br><br>
Terimakasih telah mendaftar untuk turut berpartisipasi dalam acara ` . $name . `.
<br><br>
Detail Acara
<br>
` . $name . `
Waktu: ` . $start . `<br><br>

Silakan klik link di bawah ini untuk bergabung ke dalam grup yang telah kami sediakan, untuk informasi dan koordinasi acara lebih lanjut.  
<br><br>` . $group . `<br><br>Terimakasih.`;

    $wax = date("Y-m-d H:i:s", strtotime($start));
    $way = date("Y-m-d H:i:s", strtotime($end));

    $grip = date("Y-m-d", strtotime($wax)) . "T" . date("H:i:s", strtotime($wax));
    $gripp = date("Y-m-d", strtotime($way)) . "T" . date("H:i:s", strtotime($way));
    $eventStart = date_create($grip, new DateTimeZone('Asia/Jakarta'));
    $eventEnd = date_create($gripp, new DateTimeZone('Asia/Jakarta'));

    $icsContent = "BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTAMP:" . date('Ymd\THis') . "
DTSTART:" . $eventStart->format('Ymd\THis') . "
DTEND:" . $eventEnd->format('Ymd\THis') . "
SUMMARY:" . $trn . " - Konseling
DESCRIPTION:Jadwal dibuat oleh " . $fnm . " untuk ditangani oleh " . $trn . " perihal " . $tp . ".
END:VEVENT
END:VCALENDAR";

    // Simpan konten .ics ke file
    file_put_contents('./jadwal/' . $name . '.ics', $icsContent);

    $mail = new PHPMailer(true);

    // Konfigurasi SMTP
    $mail->isSMTP();
    $mail->Host = 'mail.compasspubindonesia.com'; // Ganti dengan server SMTP Anda
    $mail->SMTPAuth = true;
    $mail->Username = 'cs@compasspubindonesia.com'; // Ganti dengan alamat email Anda
    $mail->Password = 'CompassPub2024!'; // Ganti dengan kata sandi email Anda
    $mail->SMTPSecure = 'ssl'; // Gunakan 'tls' atau 'ssl' sesuai kebutuhan
    $mail->Port = 465; // Port SMTP

    // Konfigurasi email
    $mail->setFrom('cs@compasspubindonesia.com', 'Compass Publishing Indonesia'); // Alamat email pengirim

    $mail->addAddress($email, $pname); // Alamat email penerima

    $mail->isHTML(true);
    $mail->Subject = $name . ": Registrasi Berhasil - " . $pname;
    $mail->Body = $body;
    $mail->addAttachment($name . '.ics', $name . '.ics');

    // Kirim email
    $mail->send();
}
