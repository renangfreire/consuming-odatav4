sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device",
    "com/lab2dev/odatav4products/connection/connector"
], 
    function (JSONModel, Device, connector) {
        "use strict";

        return {
        createDeviceModel: function () {
            var oModel = new JSONModel(Device);
            oModel.setDefaultBindingMode("OneWay");
            return oModel;
        },
        getProducts: function(){
            return connector.get('/Products')
        },
        postProduct: function(){

            const oProduct = 
            {
                  "Name": "Grape Juice",
                  "Description": "A delicious grape juice",
                  "Price": 10,
                  "Quantity": 20
            }

            return connector.post(oProduct, "/Products")
        },
        putProduct: function() {
            const sID = "cc06d375-0c0f-4fb8-9568-7bbf3e0e0807"
            const oProduct = {
                "Name": "A Test in PUT",
                "Description": "Its a very very interesting test",
                "ImageUrl": "/product/webapp/assets/test.jpg",
            }

            return connector.put(oProduct, "/Products", sID)
        },
        deleteProduct: function(){
            const sID = "038a19af-330a-4092-bee1-daaa0f287cd5"

            return connector.delete("/Products", sID)
        }
    };
});