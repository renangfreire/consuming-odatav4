// @ts-nocheck

sap.ui.define([
    "sap/ui/model/odata/v4/ODataModel",
  ],
  function (ODataModel) {
    "use strict";

    /**
     * @type {import("./connector.types")}
     */
    return {
      _defaultFilter: function(sID) {
        return {
          $filter: `ID eq ${sID}`
        }
      },
      init: function (oComponent) {
        this._oComponent = oComponent
      },
    
      /** 
        * @method getOwnerComponent
        * @private
        * @returns {sap.ui.core.Component} - Componente do UI5
        */
      getOwnerComponent: function () {
        return this._oComponent
      },
    
      /** 
        * @method getODataModel
        * @private
        * @param {String} sModelName - Representa o nome da Model
        * @returns {sap.ui.model.odata.v4.ODataModel} - Representa a oData Model
        */
      getODataModel: function (sModelName) {
        const oDataModel = this.getOwnerComponent().getModel(sModelName)
        return oDataModel
      },
    
      /** 
        * @method getODataModel
        * @param {string} sModelName - Nome da model dentro da manifest
        * @param {string} sPath - Caminho da requisição
        * @param {mParameters=} oURLParams - Parâmetros adicionais de URL.
        * @param {sap.ui.model.odata.v4.Context=} oContext - Contexto do componente UI5
        * @param {sap.ui.model.Filter=} oFilter - Filtro do próprio UI5
        * @param {sap.ui.model.Sorter=} oSort - Sort do próprio UI5
        * @returns {sap.ui.model.odata.v4.ODataListBinding} - Representa o listBinding -> Context
        */
      _oDataBindingList: function(sModelName, sPath, oContext, oURLParams, oFilter, oSort){
        return this.getODataModel(sModelName).bindList(sPath, oContext, oSort, [oFilter], oURLParams);
      },
          
      read: async function ({sModelName, sPath, oURLParams, oContext}) {
        const oODataModel = this.getODataModel(sModelName);
        
        const oDataContext = oODataModel.bindContext(sPath, oContext, oURLParams)
        const oResponse = await oDataContext.requestObject()
        const aData = oResponse.value || oResponse
    
        return aData
      }, 
      
      readListBinding: async function ({sModelName, sPath, oURLParams, oContext, oFilter, oSort}) {
        // Somente funciona com Filtros Padrão do FilterOperator
        const oDataBindList = this._oDataBindingList(sModelName, sPath, oContext, oURLParams, oFilter, oSort)
        const aContexts = await oDataBindList.requestContexts()
        const aData = Promise.all(aContexts.map((promise) => promise.requestObject()))
        
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
    
      update: async function({sModelName, oChangedData, sPath, sID, oContext, oURLParams, oFilter, oSort}){
        const oSettings = !sID ? oURLParams : this._defaultFilter(sID) 
    
        const oDataBindList = this._oDataBindingList(sModelName, sPath, oContext, oSettings, oFilter, oSort);
        
          const [ oDataContext ] = await oDataBindList.requestContexts()

          const aChangedDataPromises = Object.entries(oChangedData).map(([key, value]) => {
            return oDataContext.setProperty(key, value);
          })

          await Promise.all(aChangedDataPromises)

          const oEntity = await oDataContext.requestObject()

          return oEntity
      },

      updateMany: async function({sModelName, oChangedData, sPath, oContext, oURLParams, oFilter, oSort}){
        // Not tested yet
        const oDataBindList = this._oDataBindingList(sModelName, sPath, oContext, oURLParams, oFilter, oSort);
        
        const aContexts = await oDataBindList.requestContexts()
    
        const aChangedDataPromises = aContexts.map(oDataContext => {
            return Object.entries(oChangedData).map(([key, value]) => {
              return oDataContext.setProperty(key, value);
            })
        })
    
        await Promise.all(aChangedDataPromises)
    
        const aEntities = await aContexts.map(oDataContext => {
          return oDataContext.requestObject()
        })
    
        return aEntities
      },
    
      delete: async function({sModelName, sPath, sID, oContext}){
        const oSettings = this._defaultFilter(sID) 
    
        const oDataBindList = this._oDataBindingList(sModelName, sPath, oContext, oSettings);
    
        const [ oDataContext ] = await oDataBindList.requestContexts()
    
        await oDataContext.delete()
    
        return oDataContext.oDeletePromise.getResult()
      },
    }
  });