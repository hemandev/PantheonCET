<?php
	require_once('session.php');
	require_once('userclass.php');
	$user_logout = new USER();
	
	/*if($user_logout->is_loggedin()!="")
	{
		$user_logout->redirect('../profile.php');
	}*/
	if(isset($_GET['logout']) && $_GET['logout']=="logout")
	{
		echo "string";
		$user_logout->doLogout();
		$user_logout->redirect('../login.php');
	}
