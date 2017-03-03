<?php

require_once('dbconfig.php');

class USER
{

    private $conn;

    public function __construct()
    {
        $database = new Database();
        $db = $database->dbConnection();
        $this->conn = $db;
    }

    public function runQuery($sql)
    {
        $stmt = $this->conn->prepare($sql);
        return $stmt;
    }

    public function register($name,$mail,$phone,$college,$workshop,$accom,$userId,$year)
    {
        try
        {

            if($accom!='Yes'){
                $accom='No';
            }

            $stmt = $this->conn->prepare("INSERT INTO register(name,email,phone,college,workshop,accom,year,user_id) 
                                                   VALUES(:name,:email,:phone,:college,:workshop,:accom,:year,:user_id)");

            $stmt->bindparam(":name", $name);
            $stmt->bindparam(":email", $mail);
            $stmt->bindparam(":phone",$phone);
            $stmt->bindparam(":college", $college);
            //  $stmt->bindparam(":c_id", $c_id);
            $stmt->bindparam(":workshop", $workshop);
            $stmt->bindParam(":accom",$accom);
            $stmt->bindParam(":user_id",$userId);
            $stmt->bindParam(":year",$year);
            $stmt->execute();

            return $stmt;
        }
        catch(PDOException $e)
        {

            echo $e->getMessage();
        }
    }


    /*public function doLogin($umail,$upass)
    {
      try
      {
        $stmt = $this->conn->prepare("SELECT uid, pwd, status FROM user_login WHERE uid=:umail AND status=:stat ");
        $stmt->execute(array(':umail'=>$umail, ':stat'=>'1'));
        $userRow=$stmt->fetch(PDO::FETCH_ASSOC);
        if($stmt->rowCount() == 1)
        {
          if(password_verify($upass, $userRow['pwd']))
          {
            $_SESSION['user_session'] = $userRow['uid'];

            return true;
          }
          else
          {
            return false;
          }
        }
      }
      catch(PDOException $e)
      {
        echo $e->getMessage();
      }
    }*/

    public function is_loggedin()
    {
        if(isset($_SESSION['user_session']))
        {
            return true;
        }
    }

    public function redirect($url)
    {
        header("Location: $url");
    }

    public function doLogout()
    {
        session_destroy();
        unset($_SESSION['user_session']);
        return true;
    }

    public function getLastId(){
        $q = $this->conn->query("SELECT last_id FROM config");
        $lastId = $q->fetchColumn();

        //increment this ID.

        $q = $this->conn->query("UPDATE config SET last_id = last_id+1");

        return $lastId;
    }
}
?>