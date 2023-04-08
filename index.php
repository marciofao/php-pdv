<?php

require_once('vendor/autoload.php');
require_once('config.php');
require_once('database.php');
require_once('product_controller.php');
require_once('product_types_controller.php');
require_once('endpoints.php');


header("location: /frontend/build");
/* 
echo "<pre>";
var_dump(get_product_types(1)); */
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

</head>

<body>
    Acesse o app frontend em <a href="http://localhost:3000/">http://localhost:3000/</a>

</body>

</html>