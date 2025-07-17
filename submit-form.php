<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name     = htmlspecialchars(trim($_POST['name']));
    $email    = htmlspecialchars(trim($_POST['email']));
    $phone    = htmlspecialchars(trim($_POST['phone']));
    $company  = htmlspecialchars(trim($_POST['company']));
    $subject  = htmlspecialchars(trim($_POST['subject']));
    $message  = htmlspecialchars(trim($_POST['message']));

    $to = "nirwangeethg@gmail.com"; // 🔁 Replace with your email
    $email_subject = "Contact Form: $subject";

    $email_body = "You received a message:\n\n" .
                  "Name: $name\n" .
                  "Email: $email\n" .
                  "Phone: $phone\n" .
                  "Company: $company\n" .
                  "Subject: $subject\n\n" .
                  "Message:\n$message";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($to, $email_subject, $email_body, $headers)) {
        echo "Message sent!";
    } else {
        echo "❌ Message failed. Mail function returned false.";
    }
} else {
    echo "Invalid request.";
}
?>
