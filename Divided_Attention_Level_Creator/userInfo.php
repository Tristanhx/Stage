<?php
/**
 * Created by PhpStorm.
 * User: Tristan
 * Date: 25/02/2018
 * Time: 22:10
 */
    include("../conf/db_info.php");
    // include the database
    $con = mysqli_connect($servername, $username, $password, $dbname);
    #$db = mysqli_select_db($con, 'test');
    if ($con->connect_error){
        die("Connection failed: " . $con->connect_error);
    }

    $prep = $con->prepare("INSERT INTO thx_prototype_divided_attention_level_creator (name, data, ip_address, date) VALUES(?, ?, ?, NOW())");
    $prep->bind_param("sss", $name, $data, $ip_address);

    $name = strip_tags($_POST['name']);
    $data = strip_tags($_POST['data']);
    if(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip_address = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip_address = $_SERVER['REMOTE_ADDR'];
    }

    $prep->execute();

    $prep->close();
    $con->close();