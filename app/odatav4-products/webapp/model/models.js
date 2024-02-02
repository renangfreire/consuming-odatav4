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
                const oRequestedObject = connector.get('/Products')

                oRequestedObject.then((oData) => {
                    console.log(oData)
                }).catch(error => console.log(error.message))
        },
        postProduct: function(){

            const oProduct = 
            {
                  "Name": "Grape Juice",
                  "Description": "A delicious grape juice",
                  "Price": 10,
                  "ImageUrl": "/product/webapp/assets/grape-juice.jpg",
                  "ReleaseDate": "1990-01-01T00:00:00Z",
                  "DiscontinuedDate": null,
                  "Height": 5,
                  "Width": 2.1,
                  "Depth": 2,
                  "Quantity": 20
            }

            const oStatusRequest = connector.post(oProduct, "/Products")

            oStatusRequest.then((oData) => {
                console.log("new data ", oData)
            }).catch(err => {
                alert("Error ao criar um produto")
            })
        },
        putProduct: function() {
            const sID = "038a19af-330a-4092-bee1-daaa0f287cd5"
            const oProduct = {
                "Name": "A Test in PUT",
                "Description": "Its a very very interesting test",
                "ImageUrl": "/product/webapp/assets/test.jpg",
            }

            const oData = connector.put(oProduct, "/Products", sID)

            oData.then(oData => {debugger}).catch(err => {
                console.log(err)
            })
        },
        deleteProduct: function(){
            const sID = "227ef192-48f7-49a4-81f2-1b16fcf6fcfe"

            const oData = connector.delete("/Products", sID)

            oData.then(oData => {
                debugger
            }).catch(err => console.log(err))
        }
    };
});