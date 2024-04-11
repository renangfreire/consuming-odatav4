sap.ui.define([
  "sap/ui/model/odata/v4/ODataModel",
],
  function (ODataModel) {
    "use strict";

    return {
      init: function (oComponent) {
        this._oComponent = oComponent
      },

      getOwnerComponent: function () {
        return this._oComponent
      },

      getODataModel: function (sModelName) {
        const oDataModel = this.getOwnerComponent().getModel(sModelName)
        return oDataModel
      },

      _oDataBindingList: function(sModelName, sPath, oContext, oURLParams){
        return this.getODataModel(sModelName).bindList(sPath, oContext, null, null, oURLParams);
      },

      read: async function ({sModelName, sPath, oURLParams, oContext}) {
        const oODataModel = this.getODataModel(sModelName);

        const oDataContext = oODataModel.bindContext(sPath, oContext, oURLParams)

        const oResponse = await oDataContext.requestObject()
        const oData = oResponse.value || oResponse

        return oData
      },
      
      create: async function ({sModelName, oData, sPath, oContext, bSkipRefresh = false}) {
        const oDataBindList = this._oDataBindingList(sModelName, sPath, oContext);
        const oEntity = oDataBindList.create(oData, bSkipRefresh)
        
        await new Promise(async (resolve, reject) => {
            oDataBindList.attachCreateCompleted((oEvent) => { 
                const { success } = oEvent.getParameters();
              
                if (!success) {
                const aBatchMessages = oDataBindList.getModel().mMessages[""]
                
                const aBatchMessagesClone = [...aBatchMessages].reverse()
                const hasBatchError = aBatchMessagesClone?.find(res => res.message !== '' && res.code >= 400); 

                if(hasBatchError){ 
                  reject(hasBatchError)
                }
            }

          resolve()
        })
      })

        return oEntity
      },

      update: async function({sModelName, oChangedData, sPath, sID, oContext}){
          const oSettings = {
            $filter: `ID eq ${sID}`
          }

          const oDataBindList = this._oDataBindingList(sModelName, sPath, oContext, oSettings);
          
          const [ oDataContext ] = await oDataBindList.requestContexts()

          const aChangedDataPromises = Object.entries(oChangedData).map(([key, value]) => {
            return oDataContext.setProperty(key, value);
          })

          await Promise.all(aChangedDataPromises)

          const oEntity = await oDataContext.requestObject()

          return oEntity
      },

      delete: async function({sModelName, sPath, sID, oContext}){
        const oSettings = {
          $filter: `ID eq ${sID}`
        }
  
        const oDataBindList = this._oDataBindingList(sModelName, sPath, oContext, oSettings);

        const [ oDataContext ] = await oDataBindList.requestContexts()

        await oDataContext.delete()

        return oDataContext.oDeletePromise.getResult()
      },
    };
  });