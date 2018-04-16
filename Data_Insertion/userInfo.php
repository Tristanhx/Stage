<?php
/**
 * Created by PhpStorm.
 * User: Tristan
 * Date: 25/02/2018
 * Time: 22:10
 */
    // include the database
    include_once ('db.php');

    // these are the names of the columns
    $name = $_POST['name'];
    $score = $_POST['score'];

    // here we make the query and check if successful
    // mysqli requires the first parameter to be the connection, the second is the query
    if(mysqli_query($con, "INSERT INTO players VALUES('$name', '$score')"))
        echo "Success!";
    else
        echo "Failed!";
