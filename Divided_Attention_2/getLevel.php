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

$result = mysqli_query($con, "SELECT data FROM thx_prototype_divided_attention_level_creator WHERE id=18");

while ($row = $result->fetch_assoc())
{
    foreach($row as $value) {
        echo $value;
    }
}
