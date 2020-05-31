using { inventory.db as db } from '../db/inv-model';

service AdminService @(_requires:'admin'){
    entity Products as projection on db.Products;
    entity Suppliers as projection on db.Suppliers;
    entity Orders as projection on db.Orders;
}   