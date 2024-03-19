sap.ui.define([
    "com/lab2dev/odatav4products/controller/BaseController",
    "com/lab2dev/odatav4products/model/models",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, models, JSONModel) {
        "use strict";

        return Controller.extend("com.lab2dev.odatav4products.controller.Home", {
            onInit: function () {
                const oRequestedObject = models.getProducts()

                oRequestedObject.then((aData) => {
                    const oModel = new JSONModel(aData)
                    this.getView().setModel(oModel, 'products')
                    
                }).catch(error => console.log(error.message))
            },
            onEditProduct: function(){
                const oProduct = {
                    "ID": "cc06d375-0c0f-4fb8-9568-7bbf3e0e0807",
                    "Name": "A Test in PUT",
                    "Description": "Its a very very interesting test",
                }

                // Sim é preciso passar o ID separado, na função abaixo
                const sID = oProduct.ID

                const oRequestedObject = models.putProduct(oProduct, sID)

                oRequestedObject.then(async (oContext) => {
                    const aData = await oContext.getSameRoute()

                    const oModel = new JSONModel(aData)
                    this.getView().setModel(oModel, 'products')
                }).catch(error => console.log(error.message))
            },
            onDeleteProduct: function(){
                const sID = "038a19af-330a-4092-bee1-daaa0f287cd5"

                const oRequestedObject = models.deleteProduct(sID);

                oRequestedObject.then(async (oContext) => {
                    const aData = await oContext.getSameRoute()

                    const oModel = new JSONModel(aData)
                    this.getView().setModel(oModel, 'products')
                }).catch(error => console.log(error.message))
            },
            onCreateProduct: async function(){
                const oProduct = 
                {
                      "Name": "ERROR",
                      "Description": "A delicious grape juice",
                      "Price": 10,
                      "Quantity": 20
                }

                
                const oProduct2 = 
                {
                    "Name": "Grape Juice",
                    "Description": "A delicious grape juice",
                    "Price": 10,
                    "Quantity": 20
                }
                
                try {
                    const oRequestedObject = await models.postProduct(oProduct)
                } catch (error) {
                    console.log(error)
                }
                const oRequestedObject2 = await models.postProduct(oProduct2)
            }
        });
    });
