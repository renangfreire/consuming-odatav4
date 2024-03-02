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
                const oRequestedObject = models.putProduct()

                oRequestedObject.then(async (oContext) => {
                    const aData = await oContext.getSameRoute({})

                    const oModel = new JSONModel(aData)
                    this.getView().setModel(oModel, 'products')
                }).catch(error => console.log(error.message))
            },
            onDeleteProduct: function(){
                const oRequestedObject = models.deleteProduct();

                oRequestedObject.then(async (oContext) => {
                    const aData = await oContext.getSameRoute()

                    const oModel = new JSONModel(aData)
                    this.getView().setModel(oModel, 'products')
                }).catch(error => console.log(error.message))
            },
            onCreateProduct: function(){
                const oRequestedObject = models.postProduct()

                oRequestedObject.then(async (oContext) => {
                    const aData = await oContext.getSameRoute()

                    const oModel = new JSONModel(aData)
                    this.getView().setModel(oModel, 'products')
                    
                }).catch(error => console.log(error.message))

            }
        });
    });
