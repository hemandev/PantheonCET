<!DOCTYPE html>
<html>
    <head>
        <title>Foradmin</title>
        <link rel="stylesheet" href="css/register.css">
        <style type="text/css">
        body{
        background-color: black;
        }
        input{
         text-transform: none !important;
              }
        </style>
    </head>
    <body>
        <div class="banner">
            <div class="banr-info">
                <div class="reg_logo">
                    Login
                </div>
                <div class="bnr-text">
                    <div class="contact-form">
                        <form id="login-form" action="includes/register.php" method="POST">
                            <div class="contact-grids">
                                <input type="text" placeholder="Name" name="adminname">
                                <input type="password" placeholder="password" name="password">
                            </div>
                            <input type="submit" value="Login" id="login" name="login">
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
	