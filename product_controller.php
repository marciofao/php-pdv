<?php

function set_product($name, $value, $product_type_id) {
    global $db;
    return $db->insert('products', [
        'name' => $name,
        'value' => $value,
        'product_type_id' => $product_type_id
    ]);
}

function get_products() {
    global $db;
    return $db->select('products', [
        "[>]product_types" => ["product_type_id" => "id"]
    ], ["products.id",  "products.name", "products.value", "product_type_id", "product_types.name (product_type)", "tax_percent"]);
}

function get_product($id) {
    global $db;
    return $db->select('products', [
        "[>]product_types" => ["product_type_id" => "id"]
    ], ["products.id",  "products.name", "products.value", "product_type_id", "product_types.name (product_type)", "tax_percent"], ["products.id" => $id]);
}

function delete_product($id) {
    global $db;
    return $db->delete('products', ["id" => $id]);
}