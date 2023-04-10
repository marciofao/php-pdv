<?php

function set_sell($value, $tax, $items) {
    global $db;
    if (
        $db->insert('sells', [
            'value' => $value,
            'taxes' => $tax,
            'items' => $items,
        ])
    ) {
        //return last id
        return $db->id();
    } else {
        return $db->error;
    }

}

function get_sells() {
    global $db;
    return $db->select('sells', "*");
}

function delete_sell($id) {
    global $db;
    return $db->delete('sells', ["id" => $id]);
}