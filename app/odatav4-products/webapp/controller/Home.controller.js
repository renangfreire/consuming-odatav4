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
                    const oModel = new JSONModel({products: aData})
                    this.getView().setModel(oModel)
                    
                }).catch(error => console.log(error.message))

            },
            onEditProduct: function(){
                const oRequestedObject = models.putProduct()

                oRequestedObject.then((aData) => {
                    const oModel = new JSONModel({products: aData})
                    this.getView().setModel(oModel)
                    
                }).catch(error => console.log(error.message))
            },
            onDeleteProduct: function(){
                const oRequestedObject = models.deleteProduct();

                oRequestedObject.then((aData) => {
                    const oModel = new JSONModel({products: aData})
                    this.getView().setModel(oModel)
                    
                }).catch(error => console.log(error.message))
            },
            onCreateProduct: function(){
                const oRequestedObject = models.postProduct()

                oRequestedObject.then((aData) => {
                    const oModel = new JSONModel({products: aData})
                    this.getView().setModel(oModel)
                    
                }).catch(error => console.log(error.message))

            }
        });
    });
