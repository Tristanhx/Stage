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

    if ($con->connect_error){
        die("Connection failed: " . $con->connect_error);
    }

    $prep = $con->prepare("INSERT INTO thx_prototype_whackamole (name, score, ip_address,noticed_sequence, date) VALUES(?, ?, ?, ?, NOW())");
    $prep->bind_param("ssss", $name, $score, $ip_address, $noticed_sequence);

    $name = strip_tags($_POST['name']);
    $score = $_POST['score'];
    if(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip_address = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip_address = $_SERVER['REMOTE_ADDR'];
    }
    $noticed_sequence = $_POST['noticed_sequence'];

    $prep->execute();

    $prep->close();
    $con->close();