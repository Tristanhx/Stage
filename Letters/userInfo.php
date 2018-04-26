<?php
/**
 * Created by PhpStorm.
 * User: Tristan
 * Date: 25/02/2018
 * Time: 22:10
 */
    // include the database
    $con = mysqli_connect('localhost', 'root', '');
    $db = mysqli_select_db($con, 'test');

    $name = $_POST['name'];
    $score = $_POST['score'];
    if(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip_address = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip_address = $_SERVER['REMOTE_ADDR'];
    }


    // here we make the query
    // mysqli requires the first parameter to be the connection, the second is the query
    if(mysqli_query($con, "INSERT INTO thx_prototype_letters (name, score, ip, date) VALUES('$name', '$score', '$ip_address', NOW())"))
        echo "Succesfull " . $name . $score;
    else
        echo "Failed";