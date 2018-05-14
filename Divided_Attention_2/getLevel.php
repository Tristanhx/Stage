<?php
/**
 * Created by PhpStorm.
 * User: Tristan
 * Date: 16/04/2018
 * Time: 13:32
 */

include("../conf/db_info.php");
// include the database
$con = mysqli_connect($servername, $username, $password, $dbname);
#$db = mysqli_select_db($con, 'test');

if ($con->connect_error){
    die("Connection failed: " . $con->connect_error);
}

if($prep = $con->prepare("SELECT data FROM thx_prototype_divided_attention_level_creator WHERE id=?")) {
    $prep->bind_param("i", $id);

    $id = 19;
    $prep->execute();

    $result = $prep->get_result();

    while ($row = $result->fetch_assoc()) {
        foreach ($row as $value) {
            echo strip_tags($value);
        }
    }

    $prep->close();
}
$con->close();


