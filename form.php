<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

$recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
$recaptcha_secret = $_ENV['RECAPTCHA_SECRET'];
$recaptcha_response = $_POST['token'];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL,$recaptcha_url.'?secret='.$recaptcha_secret.'&response='.$recaptcha_response);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

$recaptcha = json_decode($response);

if ((float) $recaptcha->score >= 0.5) {
	$mail = new PHPMailer(true);
	
	try {
		$mail->isSMTP();
		$mail->Host = $_ENV['SMTP_HOST'];
		$mail->SMTPAuth = $_ENV['SMTP_AUTH'];
		$mail->Username = $_ENV['SMTP_USER'];
		$mail->Password = $_ENV['SMTP_PASS'];
		$mail->Port = $_ENV['SMTP_PORT'];
		$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

		$mail->setFrom($_ENV['SMTP_FROM_EMAIL'], 'personal.audio');
		$mail->addAddress('p.r.valentina@yandex.ru');
		$mail->addBCC('p.cherkashin@doctorhead.ru');

		$mail->CharSet = 'UTF-8';
		$mail->isHTML(true);
		$mail->Subject = 'Information from personal.audio';
		$mail->Body    = 'Имя: '.$_POST['user-name']."<br>".
						 'E-mail: '.$_POST['user-email']."<br>".
						 'Сообщение: '.$_POST['user-message']."<br>";
		$mail->send();

	} catch (Exception $e) {
		echo "Ошибка при отправке письма: {$mail->ErrorInfo}";
	}
} else {
	echo "Ошибка reCAPTCHA. Попробуйте снова.";
}
?>
