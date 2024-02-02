using { com.lab2dev as lab2dev} from '../db/schema';

service Products{
    entity Products as projection on lab2dev.Products {
        *
    }

    entity Suppliers as projection on lab2dev.Suppliers;
    
    entity SalesProduct as projection on lab2dev.SalesProduct;
}