<?php


// Using Medoo namespace.
use Medoo\Medoo;



// Connect the database.
$database = new Medoo([
    'type' => 'pgsql',
    'host' => $host,
    'database' => $database,
    'username' => $username,
    'password' => $password
]);

global $db;
$db = $database;


/* 
$database->insert('account', [
    'user_name' => 'foo',
    'email' => 'foo@bar.com'
]); */
/* 
$data = $database->select('products', [
    'name',
    'value'
]);

echo json_encode($data); */

// [{
//    "user_name" : "foo",
//    "email" : "foo@bar.com",
// }] 