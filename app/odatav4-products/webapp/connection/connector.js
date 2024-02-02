sap.ui.define([
    "sap/ui/model/odata/v4/ODataModel",
  ],
    function (ODataModel) {
      "use strict";
  
      return {
        
        init: function (oComponent) {
          this._oComponent = oComponent
        },
  
        _getOwnerComponent: function () {
          return this._oComponent
        },
  
        _getODataModel: function () {
          const oDataModel = this._getOwnerComponent().getModel() // É importante que dentro da getModel seja o mesmo nome da MODEL na MANIFEST
          return oDataModel
        },

        _oDataBindingList: function(sPath, oContext, oURLParams){
          return this._getODataModel().bindList(sPath, oContext, null, null, oURLParams);
        },
  
        get: function (sPath, oURLParam, oContext) {
        const oODataModel = this._getODataModel();

        const oDataContext = oODataModel.bindContext(sPath, oContext, oURLParam)

        return new Promise((resolve, reject) => {
            const oRequestedObject = oDataContext.requestObject()

            return oRequestedObject
                .then((oData) => {
                    resolve(oData.value)
                })
                .catch((err) =>{
                    reject(err)
                })
        })
        },
  
        post: function (oData, sPath, oContext, oURLParams) {
          return new Promise((resolve, reject) => {
              const oDataBindList = this._oDataBindingList(sPath, oContext, oURLParams);
              const oEntity =  oDataBindList.create(oData)

              oEntity.created().then(
                  oDataBindList.attachCreateCompleted(() => { 

                  resolve(this.get(sPath))
              })).catch(err => {reject(err)})
          })

        },

        put: function(oDataChanged, sPath, sID, oURLParams, oContext){
            return new Promise((resolve, reject) => {
              const oSettings = {
                ...oURLParams,
                $filter: `ID eq ${sID}`
              }

              const oDataBindList = this._oDataBindingList(sPath, oContext, oSettings);

              oDataBindList.requestContexts().then(aData => {
                const oData = aData[0]

                Object.entries(oDataChanged).forEach(([key, value]) => {
                  if (oData.getProperty(key) === value) {
                    return;
                  }

                  oData.setProperty(key, value);
                });
                resolve(this.get(sPath));
              })
                .catch(err => {
                  reject(err)
              })

            })
        },

        delete: function(sPath, sID, oURLParams, oContext){
          return new Promise((resolve, reject) => {
            const oSettings = {
              ...oURLParams,
              $filter: `ID eq ${sID}`
            }

            const oDataBindList = this._oDataBindingList(sPath, oContext, oSettings);

            oDataBindList.requestContexts().then(aData => {
              const oData = aData[0]

              oData.delete()
             
              resolve(this.get(sPath));
            })
              .catch(err => {
                reject(err)
            })
            

          })
        }
      };
    });