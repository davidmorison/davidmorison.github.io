<?php
   $filename='./mydata.txt';
   echo "Thank you <br>";
   echo "<br> your suggestion or comment has been entered as: <br>";
   $data = $_GET['yourcomment'] . "\n";
   $ret=file_put_contents($filename,$data, FILE_APPEND | LOCK_EX);
   echo $_GET['yourcomment'] . "<br>";
   die('<br> you can simply use your browsers back button');
?>





