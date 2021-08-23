<?php
    $name = $_GET['yname'];
    $strvar = $_GET['ymail'];
    $msg = $_GET['ysubject'];

    $msg .= "From: " . $strvar . "\r\n <br>";
    $msg .= "From: " . $name   . "\r\n <br>";

    echo "Thanks! double check that I got your info correct:\n <br>";
    echo "name:   "  . $name   . "\r\n <br>";
    echo "email:   " . $strvar . "\r\n <br>";
    echo "topic:   " . $msg    . "\r\n <br>";

    $to = "nosiromdivad@gmail.com";
    $subject = "Site contact form";

    $header = "From: ".$strvar."\r\n";
    $header .= "Cc: ".$strvar."\n";
    $header .= "Reply-To : ".$strvar."\r\n";
    $header .= "Return-Path : ".$strvar."\r\n";
    $header .= "X-Mailer: PHP\r\n";
    $header .= "MIME-Version: 1.0\r\n";
    $header .= "Content-Type: text/plain; charset=iso-8859-1\r\n";

    if(mail($to, $subject, $msg, $header))
    {
      echo "Mail Sent Successfully";
    }else{
      echo "Mail Not Sent";
    }

   $filename='./mydata.txt';
   $ret=file_put_contents($filename,$msg, FILE_APPEND | LOCK_EX);

    mail("nosiromdivad@gmail.com","use PHP mail","body of email");

    die('<br> you can simply use your browsers back button');
    ?>


