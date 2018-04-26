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

    $name = $_POST['name'];
    $data = $_POST['data'];
    if(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip_address = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip_address = $_SERVER['REMOTE_ADDR'];
    }


    // here we make the query
    // mysqli requires the first parameter to be the connection, the second is the query
    mysqli_query($con, "INSERT INTO divided_attention_level_creator (name, data, ip_address, date) VALUES('$name', '$data', '$ip_address', NOW())");