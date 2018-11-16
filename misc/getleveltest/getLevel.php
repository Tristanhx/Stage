<?php
/**
 * Created by PhpStorm.
 * User: Tristan
 * Date: 16/04/2018
 * Time: 13:32
 */

include("../../conf/db_info.php");
// include the database
$con = mysqli_connect($servername, $username, $password, $dbname);
#$db = mysqli_select_db($con, 'test');

if ($con->connect_error){
    die("Connection failed: " . $con->connect_error);
}

if($prep = $con->prepare("SELECT data FROM thx_prototype_divided_attention_level_creator WHERE `id` in (?,?,?,?,?);")) {
    $prep->bind_param("iiiii", $id_straight_path, $id_path_only, $id_level_1, $id_level_2, $id_level_3);

    $id_straight_path = 21;
    $id_path_only = 22;
    $id_level_1 = 23;
    $id_level_2 = 24;
    $id_level_3 = 25;

    $prep->execute();

    $result = $prep->get_result();

    if(!$result){
        echo 'result not found';
    }

    //var_dump($result);
    //echo "<br/><br/>";
    foreach ($result as $row){
        echo implode(",", $row);
        //echo "<br/><br/>";
    }

    while ($row = $result->fetch_assoc()) {
        foreach ($row as $value) {
            var_dump(strip_tags($value));
        }
    }

    $prep->close();
}
$con->close();


