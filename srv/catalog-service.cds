using { inventory.db } from '../db/inv-model';

@path: '/browse'
service CatalogService{
    @readonly entity Products as projection on db.Products;


    @requires_: 'authenticated-user'
    entity Orders as projection on db.Orders;

} 

