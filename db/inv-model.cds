namespace inventory.db;

using { managed, cuid } from '@sap/cds/common';

entity Products: cuid {
    title: localized String(100);
    description: localized String(255);
    price: Double;
    supplier: Association to Suppliers;
}

entity Suppliers{
    key ID : Integer;
    name: String;
    products: Association to many Products on products.supplier = $self;
}

entity Orders: cuid, managed {
    orderNo: String @title:'Order Number';
    items: Composition of many OrderItems on items.parent = $self;
    total: Decimal(9,2) @readonly;
}

entity OrderItems: cuid{
    parent: Association to Orders;
    product: Association to Products;
    qty: Integer;
    amount: Double;
    netAmount: Double;
}