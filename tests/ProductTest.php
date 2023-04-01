<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;

final class ProductTest extends TestCase {
    public function testInsertProduct(): void {
        require_once('vendor/autoload.php');
        require_once('config.php');
        require_once('database.php');
        require 'product_controller.php';
        var_dump(set_product('test_product', 2.2, 1));
        die;
        $this->assertEquals(
            get_product('test_product', 2.2, 1),
            true
        );
    }
}