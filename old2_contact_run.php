<?php
    $name = $_GET['yname'];
    $email = $_GET['yemail'];
    $msg = $_GET['ysubject'];

    echo "Thanks! double check that I got your info correct:\n <br>";
    echo $name . "\r\n <br>";
    echo $email . "\r\n <br>";
    echo $msg . "\r\n <br>";

    $msg  .="\r\n"
    $msg  .=$name
    $msg  .="\r\n"
    $msg  .=$email
    $msg  .="\r\n"
    echo $msg . "\r\n <br>";

    $to = "nosiromdivad@gmail.com";
    $subject = "Site contact form";

    $header = "From: ".$email."\r\n";
    $header .= "Cc: ".$email."\n";
    $header .= "Reply-To : ".$email."\r\n";
    $header .= "Return-Path : ".$email."\r\n";
    $header .= "X-Mailer: PHP\r\n";
    $header .= "MIME-Version: 1.0\r\n";
    $header .= "Content-Type: text/plain; charset=iso-8859-1\r\n";

    if(mail($to, $subject, $msg, $header))
    {
      echo "Mail Sent Successfully";
    }else{
      echo "Mail Not Sent";
    }

    die('<br> you can simply use your browsers back button');
    ?>


