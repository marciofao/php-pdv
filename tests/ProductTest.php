<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;

final class ProductTest extends TestCase {
    public function testInsertProduct(): void {

        require 'product_controller.php';
        var_dump(insert_product('test_product', 2.2, 1));
        die;
        $this->assertEquals(
            get_product('test_product', 2.2, 1),
            true
        );
    }
}