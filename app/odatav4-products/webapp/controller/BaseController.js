sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    Controller
  );

  function Controller(BaseController) {
    "use strict";

     const Controller = BaseController.extend("com.lab2dev.odatav4products.controller.BaseController", {
        /**
         * @memberOf com.lab2dev.odatav4products.controller.BaseController
         */
          refreshModel: function(oData, sModelName){
              this.getView().getModel(sModelName).setData(oData)
          }
    });

    return Controller
  }