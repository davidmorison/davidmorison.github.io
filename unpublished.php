<?php
   $filename='./textfile.txt';
   echo "Password Check <br>";
   $data = $_GET['enter_password'];
if (strlen($data)>5){
   $ret=file_get_contents($filename);
   echo "you entered: ". $data . "<br>";
   #echo "debug??    : ". $ret  . "<br>";
   $pos=strpos($ret, $data);
   #echo "debug??    : ". $pos  . "<br>";
   if (is_int($pos)){
      echo "<br><br> <a href=\"./publications/Morison_et_al_Quasiperiodic_Nat_Phys_submission_2021.pdf\" > Order to Disorder in Quasiperiodic Composites </a>";
      echo "<br><br> <a href=\"./publications/The_Cyclonic_Mode_of_Arctic_Ocean_Circulation.pdf\" > The Cyclonic Mode of Arctic Ocean Circulation </a>";
      echo "<br>";
   } else {
      echo "password not found";
   }
} else{echo " more than five letters "; }
   die('<br> you can simply use your browsers back button');
?>






