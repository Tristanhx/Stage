<?php
/**
 * Created by PhpStorm.
 * User: Tristan
 * Date: 25/02/2018
 * Time: 21:53
 */
    // this is were we make the connection and select the database
    $con = mysqli_connect('localhost', 'root', '');
    $db = mysqli_select_db($con, 'test');