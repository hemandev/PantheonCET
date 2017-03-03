<?php
session_start();

require_once("userclass.php");
$login = new USER();
$user = new USER();


if(isset($_POST['login']))
{

    $umail = strip_tags($_POST['adminname']);
    $upass = strip_tags($_POST['password']);

    if($umail=="admin@pantheoncet.com"&&$upass=="admin123"){

        $_SESSION['user_session'] = $umail;
        $login->redirect("foradmin.php");
    }

    else
    {
        $loginerror = "Wrong Details or account is not activated yet!";
        echo $loginerror;
    }
}

//Sign up


if(isset($_POST['name']))
{
    $name = trim($_POST['name']);
    $mail = trim($_POST['email']);
    $phone = ($_POST['phone']);
    $college = trim($_POST['college']);
    // $collegeid = trim($_POST['collegeid']);
    // $event = trim($_POST['event']);
    $workshop=trim($_POST['workshop']);
    $accom=$_POST['accom'];
    $year=$_POST['year'];





    try
    {

        $lastId = $user->getLastId();
        $newId = $lastId+1;

        $user->register($name,$mail,$phone,$college,$workshop,$accom,$newId,$year);
        student_confirmation($name,$mail,$newId);
    }
    catch(PDOException $e)
    {
        echo $e->getMessage();
    }
}




function student_confirmation($name,$mail,$userId)
{

    $pantheonId = 'PN-'.$userId;
    $subject = "Pantheon ID";
    $headers = "From: noreply@pantheon.com \r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

    $message = '<html><body>';
    $message.='<div style="width:550px; background-color:#CC6600; padding:15px; font-weight:bold;">';
    //$message.='Pantheon ID';
    $message.='</div>';
    $message.='<div style="font-family: Arial;"><br/>';
    $message.="Hi $name ,You have been succesfully registered into Pantheon 2016.";
    $message.='<br><b> Your Pantheon ID is '.$pantheonId.'</b><br>';
    $message.= "DON'T FORGET TO BRING YOUR PANTHEON ID.SEE YOU AT PANTHEON 2016. ";
    // $message.="<a href='http://yourdomain.com/user-confirmation.php?id=$id&email=$email&confirmation_code=$rand'>click</a>";
    $message.='</div>';
    $message.='</body></html>';

    if(mail($mail,$subject,$message,$headers)){

    }

    else
        echo "error";
}




?>

