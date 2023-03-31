<?php

function insert_product($name, $value, $tax_id) {
    return $db->insert('products', [
        'name' => $name,
        'value' => $value,
        'tax_id' => $tax_id
    ]);
}

function get_products() {
    return $db->select('products', [
        "product_types" => ["product_type_id" => "tax_id"]
    ], "*");
}

function get_product($id) {
    return $db->select('products', "*", ["id" => $id]);
}