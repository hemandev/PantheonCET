<?php

//A form mail auto generator



$email_recipients = "icipantheon2@gmail.com";// enter your email address here



$visitors_email_field = 'email';// User's mail

$email_subject = $_POST['subject'];

$enable_auto_response = true;//Make this false if no auto resp


$today = getdate();

$tday=$today['mday'].".".$today['month'].".".$today['year'];

$auto_response_subj = "Enquiry on ".$tday;
$auto_response ="
Hi,

We thank you for your enquiry . We will be contacting you shortly.

Regards
pantheon 2016
";


$email_from = 'admin@pantheoncet.com'; //If left blank then server address
$thank_you_url = '';//URL to redirect to if needed


if(!isset($_POST['email']))
{
	echo "error; you need to submit the form!".print_r($_POST,true);
    exit;
}

$visitor_email='';

if(!empty($visitors_email_field))
{
    $visitor_email = $_POST[$visitors_email_field];
}

if(empty($email_from))
{
    $host = $_SERVER['SERVER_NAME'];
    $email_from ="admin@pantheoncet.com"; //help@bookatutor.com
}

$fieldtable = '';
foreach ($_POST as $field => $value)
{
    if($field == 'email')
    {
        continue;
    }
    if(is_array($value))
    {
        $value = implode(", ", $value);
    }
    $fieldtable .= "$field: $value\n";
}



$loc_info=(unserialize(file_get_contents('http://www.geoplugin.net/php.gp?ip='.$_SERVER['REMOTE_ADDR'])));
$extra_info = "User's location: ".$loc_info['geoplugin_city'].", ".$loc_info['geoplugin_region'].", ".$loc_info['geoplugin_countryName']."\n";

$email_body = "You have received a new form submission. Details below:\n$fieldtable\n $extra_info";
    
$headers = "From: $email_from \r\n";
$headers .= "Reply-To: $visitor_email \r\n";


@mail($email_recipients, $email_subject, $email_body,$headers);



if($enable_auto_response == true && !empty($visitor_email))
{
    $headers = "From: $email_from \r\n";
    @mail($visitor_email, $auto_response_subj, $auto_response,$headers);
}

//AJAX form submit
if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])
    AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') 
{
    
    echo "success";
}
else
{
    
    header('Location: '.$thank_you_url);
}
?>