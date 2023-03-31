<?php

function set_product_type($name, $tax_percent) {
    global $db;
    return $db->insert('product_type', [
        'name' => $name,
        'tax_percecnt' => $tax_percent
    ]);
}

function get_product_types() {
    global $db;
    return $db->select('product_types', "*");
}

function get_product_type($id) {
    global $db;
    return $db->select('product_types', "*", ["id" => $id]);
}

function delete_product_type($id) {
    global $db;
    return $db->delete('product_types', ["id"=>$id])
}