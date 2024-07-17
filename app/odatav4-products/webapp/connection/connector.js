sap.ui.define([
  "sap/ui/model/odata/v4/ODataModel",
],
  function (ODataModel) {
    "use strict";

    return {
      _defaultFilter: function(sID) {
        // Troque o "ID" quando o backend tiver um ID com nome diferente desse abaixo!
        return {
          $filter: `ID eq ${sID}`
        }
      },
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

      _oDataBindingList: function(sModelName, sPath, oContext, oURLParams, oFilter, oSort){
        return this.getODataModel(sModelName).bindList(sPath, oContext, oSort, [oFilter], oURLParams);
      },

      read: async function ({sModelName, sPath, oURLParams, oContext, oFilter, oSort}) {
        // Somente funciona com Filtros Padrão === when use FilterOperator
        const oDataBindList = this._oDataBindingList(sModelName, sPath, oContext, oURLParams, oFilter, oSort)
        const aContexts = await oDataBindList.requestContexts()
        const aData = Promise.all(aContexts.map((promise) => promise.requestObject()))
        
        // Versão anterior, é mais performática quando não utilizar oFilter e oSort
        // const oODataModel = this.getODataModel(sModelName);
        // const oDataContext = oODataModel.bindContext(sPath, oContext, oURLParams)
        // const oResponse = await oDataContext.requestObject()
        // const aData = oResponse.value || oResponse
        
        return aData
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
                const hasBatchError = aBatchMessagesClone?.find(res => res.message !== '' && (res.code >= 400 || res.getTechnicalDetails().httpStatus >= 400)); 

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
          const oSettings = this._defaultFilter(sID) 

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
        const oSettings = this._defaultFilter(sID) 
  
        const oDataBindList = this._oDataBindingList(sModelName, sPath, oContext, oSettings);

        const [ oDataContext ] = await oDataBindList.requestContexts()

        await oDataContext.delete()

        return oDataContext.oDeletePromise.getResult()
      },
    };
  });