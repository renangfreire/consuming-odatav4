namespace com.lab2dev;

entity Products {
    key ID               : UUID;
        Name             : String;
        Description      : String;
        Price            : Decimal(16, 2);
        ImageUrl         : String;
        ReleaseDate      : DateTime;
        DiscontinuedDate : DateTime;
        Height           : Decimal(16, 2);
        Width            : Decimal(16, 2);
        Depth            : Decimal(16, 2);
        Quantity         : Integer;
}

 
type Address {
    Street     : String;
    City       : String;
    State      : String(2);
    PostalCode : String;
    Country    : String;
}

entity Suppliers {
    key ID      : UUID;
        Name    : String;
        Address : Address;
        Phone   : String;
        Fax     : String
}

entity Category {
    key ID   : String(1);
        Name : String;
}

entity StockAvalibilty {
    key ID          : UUID;
        Description : String;

}

entity Currencies {
    key ID          : String(3);
        Description : String;
}

entity UnitOfMeasures {
    key ID           : String(3);
        Descraiption : String;
}


entity DimensionUnits {
    key ID          : String(2);
        Description : String;
}

entity Months {
    key ID               : String(2);
        Description      : String;
        ShortDescription : String(3);
}

entity ProductReview {
    key ID      : String(2);
        Rating  : Integer;
        Comment : String;
}

entity SalesData {
    key ID           : String(2);
        DeliveryDate : DateTime;
        Revenue      : Decimal(16, 2);
}

entity SalesProduct
    as select from Products {
        ID,
        Name,
        Description,
} 

entity Admin {
    ID : UUID;
    Name : String;
}