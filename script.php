
<?php
	ob_start();
	session_start();
	require_once 'dbconnect.php';
	
	// if session is not set this will redirect to login page
	if( !isset($_SESSION['user']) ) {
		header("Location: index.php");
		exit;
	}
	// select loggedin users detail
	$res=mysql_query("SELECT * FROM users WHERE userId=".$_SESSION['user']);
	$userRow=mysql_fetch_array($res);
?>
<?php 
$name= "$userRow[userName]";
$rune=mysql_real_escape_string($_GET['rune']);
if($rune == 'dosdls'){
mysql_query("UPDATE users SET `confirmed`='1' WHERE `userName`='$name'");

}
?>
<?php ob_end_flush(); ?>