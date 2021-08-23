<?php
    $name = $_GET['yname'];
    $strvar = $_GET['ymail'];
    $msg = $_GET['ysubject'];

    echo "Thanks! double check that I got your info correct:\n <br><br>";
    echo "name:   "  . $name   . "\r\n <br><br>";
    echo "email:   " . $strvar . "\r\n <br><br>";
    echo "topic:   " . $msg    . "\r\n <br><br>";

    $msg .= "\r\n  From: " . $strvar ;
    $msg .= "\r\n  Name: " . $name   ;

    $to = "nosiromdivad@gmail.com";
    $subject = "Site contact form";

    if(mail($to, $subject, $msg))
    {
      echo "Mail Sent Successfully";
    }else{
      echo "Mail Not Sent";
    }

   $filename='./mydata.txt';
   $ret=file_put_contents($filename,$msg, FILE_APPEND | LOCK_EX);

    echo "<br>";
    if(mail($strvar, $subject, $msg))
    {
      echo "copy also sent to you";
    }else{
      echo "unable to send to your address";
    }


    die('<br> you can simply use your browsers back button');
    ?>


