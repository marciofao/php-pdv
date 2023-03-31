<?php

function insert_product_type($name, $tax_percent) {
    return $db->insert('product_type', [
        'name' => $name,
        'tax_percecnt' => $tax_percent
    ]);
}

function get_product_types() {
    return $db->select('product_type', "*");
}

function get_product_type($id) {
    return $db->select('product_type', "*", ["id" => $id]);
}