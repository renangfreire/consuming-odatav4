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
                    "ID": "3079731b-b9ff-4125-8803-46a8e8ac0ec7",
                    "Name": "A Test in PUT",
                    "Description": "Its a very very interesting test",
                }

                // Sim é preciso passar o ID separado, na função abaixo
                const sID = oProduct.ID

                const oRequestedObject = models.putProduct(oProduct, sID)

                oRequestedObject.then(async () => {
                    const aData = await models.getProducts()

                    const oModel = new JSONModel(aData)
                    this.getView().setModel(oModel, 'products')
                }).catch(error => console.log(error.message))
            },
            onDeleteProduct: function(){
                const sID = "cc06d375-0c0f-4fb8-9568-7bbf3e0e0807"

                const oRequestedObject = models.deleteProduct(sID);

                oRequestedObject.then(async () => {
                    const aData = await models.getProducts()

                    const oModel = new JSONModel(aData)
                    this.getView().setModel(oModel, 'products')
                }).catch(error => console.log(error.message))
            },
            onCreateProduct: function(){
                const oProduct = 
                {
                      "Description": "A delicious grape juice",
                      "Price": 10,
                      "Quantity": 20
                }
                
                const oRequestedObject = models.postProduct(oProduct)

                oRequestedObject.then(async () => {
                    const aData = await models.getProducts()

                    const oModel = new JSONModel(aData)
                    this.getView().setModel(oModel, 'products')
                    
                }).catch(error => console.log(error.message))

            }
        });
    });
