<?php
   $filename='./textfile.txt';
   echo "Password Check <br>";
   $data = $_GET['enter_password'];
   $ret=file_get_contents($filename);
   echo "you entered: ". $data . "<br>";
\\   $pos = strpos($ret, $data);
\\   echo $pos
\\   if ($pos === false) {
\\       echo "The password '$data' was not found.";
\\   } else {
\\       echo "The string '$data' was found";
\\       echo "unpublised papers go here";
\\   }
   echo "in the file there was  :". $ret . "<br>";
   die('<br> you can simply use your browsers back button');
?>





