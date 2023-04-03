<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;

require_once('vendor/autoload.php');
require_once('config.php');
require_once('database.php');
require_once('product_controller.php');
require_once('product_types_controller.php');


final class ProductTest extends TestCase {
    public $insert_id = '';
    public $name = 'test_product';
    public $value = 2.2;
    public $type = 'teste';
    public $type_tax = 3.3;

    public function testProduct() {
        $type_id = set_product_type($this->type, $this->type_tax);

        $this->insert_id = set_product($this->name, $this->value, $type_id);
        //verify if ID is returned
        $this->assertTrue(is_numeric($this->insert_id));
        $res = (Object) get_product($this->insert_id)[0];
        $this->assertTrue($res->id == $this->insert_id);
        $this->assertTrue($res->name == $this->name);
        $this->assertTrue($res->value == $this->value);
        $this->assertTrue($res->product_type_id == $type_id);
        $this->assertTrue($res->product_type == $this->type);
        $this->assertTrue($res->tax_percent == $this->type_tax);

        //clean up
        delete_product($this->insert_id);
        delete_product_type($type_id);
    }

    public function testGetProducts() {
        $type_id = set_product_type($this->type, $this->type_tax);

        $this->insert_id = set_product($this->name, $this->value, $type_id);
        $insert_id_2     = set_product('testing', 1.1, $type_id);
        //verify if ID is returned

        $res = get_products();

        //verify if multiple results are returned
        $this->assertTrue(is_array($res));
        $this->assertTrue(sizeof($res) > 1);

        //clean up
        delete_product($this->insert_id);
        delete_product($insert_id_2);
        delete_product_type($type_id);
    }

}