sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/lab2dev/odatav4products/model/models"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, models) {
        "use strict";

        return Controller.extend("com.lab2dev.odatav4products.controller.Home", {
            onInit: function () {
                // const oData = models.getProducts()

                // models.postProduct()
                // models.getProducts()
                // models.putProduct()
                models.deleteProduct()
            }
        });
    });
