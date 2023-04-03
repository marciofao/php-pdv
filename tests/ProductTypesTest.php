<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;

require_once('vendor/autoload.php');
require_once('config.php');
require_once('database.php');
require_once('product_controller.php');
require_once('product_types_controller.php');


final class ProductTypesTest extends TestCase {
    public $insert_id = '';
    public $name = 'teste';
    public $type_tax = 3.3;

    public function testProductTypes() {

        $this->insert_id = set_product_type($this->name, $this->type_tax);
        $this->assertTrue(is_numeric($this->insert_id));

        $res = (Object) get_product_type($this->insert_id)[0];

        $this->assertTrue($res->id == $this->insert_id);
        $this->assertTrue($res->name == $this->name);
        $this->assertTrue($res->tax_percent == $this->type_tax);

        //clean up
        delete_product_type($this->insert_id);

    }

    public function testGetProductTypes() {
        $type_id     = set_product_type($this->name, $this->type_tax);
        $insert_id_2 = set_product_type('testing', 5);
        //verify if ID is returned

        $res = get_product_types();

        //verify if multiple results are returned
        $this->assertTrue(is_array($res));
        $this->assertTrue(sizeof($res) > 1);

        //clean up
        delete_product_type($type_id);
        delete_product_type($insert_id_2);

    }

}