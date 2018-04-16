<?php
/**
 * Created by PhpStorm.
 * User: Tristan
 * Date: 16/04/2018
 * Time: 13:32
 */

// include the database
$con = mysqli_connect('localhost', 'root', '');
$db = mysqli_select_db($con, 'test');

$result = mysqli_query($con, "SELECT data FROM divided_attention_level_creator WHERE id=2");

while ($row = $result->fetch_assoc())
{
    foreach($row as $value) {
        echo $value;
    }
}
