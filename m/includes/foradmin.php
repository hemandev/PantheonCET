<?php
require_once('userclass.php');
require_once('session.php');
$admin = new USER();
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Foradmin</title>
    <link rel="stylesheet" href="../css/register.css">
    <style type="text/css">
    body{
    background-color: rgba(0,0,0,.8);
    }

   input {
    text-transform: none !important;
}
    .banr-info button[type="submit"] {
    background: #E1DC7D;
    border: 1px solid #E1DC7D;
    padding: .6em 0;
    width: 20%;
    margin: 0.5em 12em 0;
    margin-left: 40%;
    font-size: 1em;
    color: #333;
    font-weight: 400;
    letter-spacing: 1px;
    outline: none;
    cursor: pointer;
    transition: 0.5s all ease;
    -webkit-transition: 0.5s all ease;
    -moz-transition: 0.5s all ease;
    -o-transition: 0.5s all ease;
    -ms-transition: 0.5s all ease;
    -webkit-appearance: none;
    }
    </style>
  </head>
  <body>
    <div class="banner" style="margin-top:-100px">
      <div class="banr-info">
        <div class="reg_logo" style="font-size: 20px">
          Enter either email or college Id to view the info
        </div>
        <form action="logout.php" method="GET">
          <button type="submit" value="logout" name="logout" >Logout</button>
        </form>
        <div class="bnr-text">
          <div class="contact-form">
            <form method="post">
              
              <div class="contact-grids">
                <input type="text" name="c_id" placeholder="College ID" >
                <span style="font-size: 16px; color: white">OR</span>
                <input type="text" name="mail" placeholder="E-mail" >
              </div>
              
              <input type="submit" value="get info" name="info" >
              <input type="submit" value="List All" name="listall" >
            </form>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
<?php
if(isset($_POST['info'])||isset($_POST['listall']))
{
if(!empty($_POST['c_id']))
{
$sql="select * from register where c_id=:c_id;";
$result=$admin->runQuery($sql);
$result->bindparam(":c_id",$_POST['c_id']);
$result->execute();
$row = $result->fetch();
// print_r($row);
}
if(!empty($_POST['mail']))
{

$sql="select * from register where email=:email;";
$result=$admin->runQuery($sql);
$result->bindparam(":email",$_POST['mail']);
$result->execute();
$row = $result->fetch();
}
if(isset($_POST['listall']))
{

$sql="select * from register ";
$result=$admin->runQuery($sql);
$result->execute();
$row = $result->fetch();
}
if((!empty($_POST['c_id'])||!empty($_POST['mail'])&&$result->rowCount()!= 0)||isset($_POST['listall']))
{
?>
<br>
<table border="2px" width="90%" align="center" style="color: white; font-size:25px;text-align: center;">
  <tr>
    <th>Name</th>
    <th>E-mail</th>
    <th>phone</th>
    <th>college</th>
    <th>College ID</th>
    <th>event</th>
  </tr>
  <?php do { ?>
  <tr>
    <td><?php echo $row['name']; ?></td>
    <td><?php echo $row['email']; ?></td>
    <td><?php echo ($row['phone']); ?></td>
    <td><?php echo ($row['college']); ?></td>
    <td><?php echo $row['c_id']; ?></td>
    <td><?php echo $row['event']; ?></td>
  </tr>
  <?php } while ($row = $result->fetch()); ?>
</table>
<?php
}
}
?>