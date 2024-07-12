<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];

    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.example.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'user@example.com';
        $mail->Password = 'secret';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('from@example.com', 'Kleidungs-Webshop');
        $mail->addAddress($email);

        $mail->isHTML(true);
        $mail->Subject = 'Newsletter Anmeldung';
        $mail->Body    = 'Vielen Dank für Ihre Anmeldung zum Newsletter!';
        
        $mail->send();
        echo 'Nachricht wurde gesendet';
    } catch (Exception $e) {
        echo "Nachricht konnte nicht gesendet werden. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>
