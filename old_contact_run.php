<?php
    echo "in file <br>";
  <!  if(isset($_GET['submit'])) { >
    echo "in if <br>";

    $name = $_GET['yname'];
    $email = $_GET['yemail'];
    $msg = $_GET['ysubject'];

    echo $name . "\n <br>";
    echo $email . "\n <br>";
    echo $msg . "\n <br>";

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

   <! } >
    die('<br> you can simply use your browsers back button');
    ?>




 <!   <?php                            >
 <!       echo "in file <br>";                            >
 <!       if(isset($_POST['submit'])) {                            >
 <!       echo "in if <br>";                            >
 <!                               >
 <!       $name = $_POST['yname'];                            >
 <!       $email = $_POST['yemail'];                            >
 <!       $msg = $_POST['ysubject'];                            >
 <!                               >
 <!       echo $name . "\n <br>";                            >
 <!       echo $email . "\n <br>";                            >
 <!       echo $msg . "\n <br>";                            >
 <!                               >
 <!       $to = "nosiromdivad@gmail.com";                            >
 <!       $subject = "Site contact form";                            >
 <!                               >
 <!       $header = "From: ".$email."\r\n";                            >
 <!       $header .= "Cc: ".$email."\n";                            >
 <!       $header .= "Reply-To : ".$email."\r\n";                            >
 <!       $header .= "Return-Path : ".$email."\r\n";                            >
 <!       $header .= "X-Mailer: PHP\r\n";                            >
 <!       $header .= "MIME-Version: 1.0\r\n";                            >
 <!       $header .= "Content-Type: text/plain; charset=iso-8859-1\r\n";                            >
 <!                               >
 <!       if(mail($to, $subject, $msg, $header))                            >
 <!       {                            >
 <!         echo "Mail Sent Successfully";                            >
 <!       }else{                            >
 <!         echo "Mail Not Sent";                            >
 <!       }                            >
 <!                               >
 <!       }                            >
 <!       die('<br> you can simply use your browsers back button');                            >
 <!       ?>                            >
 <!                               >
