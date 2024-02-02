using { com.lab2dev as lab2dev }  from '../db/schema';

service Admin @(path: 'administrator') {
    entity Admin as projection on lab2dev.Admin;

    @readonly
    entity AllProducts as select from lab2dev.Products {
        ID,
        Name
    }

}