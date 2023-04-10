<?php
if (isset($_GET['api'])) {

    header('Content-Type: application/json; charset=utf-8');

    $method = $_GET['api'];

    //PRODUCTS
    //Endpoint: ?api=set_product&name=test_product&value=5.5&type=1
    if ($method == 'set_product') {
        $res = set_product($_GET['name'], $_GET['value'], $_GET['type']);
        $res = json_encode($res);
        die($res);
    }
    //Endpoint?api=get_product&id=69
    if ($method == 'get_product') {
        $res = get_product($_GET['id']);
        $res = json_encode($res);
        die($res);
    }

    //Endpoint?api=get_products
    if ($method == 'get_products') {
        $res = get_products();
        $res = json_encode($res);
        die($res);
    }

    //Endpoint?api=delete_product&id=1
    if ($method == 'delete_product') {
        $res = delete_product($_GET['id']);
        $res = json_encode($res);
        die($res);
    }

    //PRODUCT TYPES
    //Endpoint: ?api=set_product_type&name=test type&tax=5.5
    if ($method == 'set_product_type') {
        $res = set_product_type($_GET['name'], $_GET['tax']);
        $res = json_encode($res);
        die($res);
    }
    //Endpoint?api=get_product_type&id=69
    if ($method == 'get_product_type') {
        $res = get_product_type($_GET['id']);
        $res = json_encode($res);
        die($res);
    }

    //Endpoint?api=get_product_types
    if ($method == 'get_product_types') {
        $res = get_product_types();
        $res = json_encode($res);
        die($res);
    }

    //Endpoint?api=delete_product_type&id=1
    if ($method == 'delete_product_type') {
        $res = delete_product_type($_GET['id']);
        $res = json_encode($res);
        die($res);
    }

    //Endpoint?api=get_sells
    if ($method == 'get_sells') {
        $res = get_sells();
        $res = json_encode($res);
        die($res);
    }

    //Endpoint?api=set_sell&value=34&taxes=3&items='[]'
    if ($method == 'set_sell') {
        $res = set_sell($_GET['value'], $_GET['taxes'], $_GET['items']);
        $res = json_encode($res);
        die($res);
    }

    //Endpoint?api=delete_sell&id=1
    if ($method == 'delete_sell') {
        $res = delete_sell($_GET['id']);
        $res = json_encode($res);
        die($res);
    }
}