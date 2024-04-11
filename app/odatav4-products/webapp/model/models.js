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
            return connector.read({sModelName: "main", sPath: '/Products'})
        },
        postProduct: function(oData){
            return connector.cread({sModelName: "main", oData, sPath: "/Products"})
        },
        putProduct: function(oChangedData, sID) {
            return connector.update({sModelName: "main", oChangedData, sPath: "/Products", sID})
        },
        deleteProduct: function(sID){
            return connector.delete({sModelName: "main", sPath: "/Products", sID})
        }
    };
});