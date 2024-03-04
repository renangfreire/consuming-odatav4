sap.ui.define([
  "sap/ui/model/odata/v4/ODataModel",
],
  function (ODataModel) {
    "use strict";

    return {
      _oContext: {
        _init({aArguments, oEntity}){
            this._oArguments = aArguments[0]
            this._oEntity = oEntity
            
            return this
        },

        getEntity: function(){
            return this._oEntity;
        },

        getSameRoute: function(oURLParams, oContext){
            const { sPath } = this.getArguments()

            return this.get({sPath, oURLParams, oContext})
        },

        getArguments: function(){
           return this._oArguments;
        }
      },

      _initContext: function(aArguments, oEntity){
        Object.setPrototypeOf(this._oContext, this);

        return this._oContext._init({ aArguments, oEntity })
      },

      init: function (oComponent) {
        this._oComponent = oComponent
      },

      getOwnerComponent: function () {
        return this._oComponent
      },

      getODataModel: function () {
        const oDataModel = this.getOwnerComponent().getModel()
        return oDataModel
      },

      _oDataBindingList: function(sPath, oContext, oURLParams){
        return this.getODataModel().bindList(sPath, oContext, null, null, oURLParams);
      },

      get: async function ({sPath, oURLParams, oContext}) {
        const oODataModel = this.getODataModel();

        const oDataContext = oODataModel.bindContext(sPath, oContext, oURLParams)

        const oResponse = await oDataContext.requestObject()
        const oData = oResponse.value || oResponse

        return oData
      },
      
      post: async function ({oData, sPath, oContext, bSkipRefresh = false}) {
        const oDataBindList = this._oDataBindingList(sPath, oContext);
        const oEntity = oDataBindList.create(oData, bSkipRefresh)
        
        await new Promise(async (resolve, reject) => {
          oDataBindList.attachCreateCompleted(() => { 
            const hasBatchError = oDataBindList.getModel().mMessages[""]?.find(res => res.message !== '' && res.code >= 400); 

            if(hasBatchError){ 
              oDataBindList.getModel().mMessages[""] = []
              reject(hasBatchError)
            }
            
            resolve()
          })
        })

        return this._initContext(arguments, oEntity)
      },

      put: async function({oChangedData, sPath, sID, oContext}){
          const oSettings = {
            $filter: `ID eq ${sID}`
          }

          const oDataBindList = this._oDataBindingList(sPath, oContext, oSettings);
          
          const [ oDataContext ] = await oDataBindList.requestContexts()

          const aChangedDataPromises = Object.entries(oChangedData).map(([key, value]) => {
            return oDataContext.setProperty(key, value);
          })

          await Promise.all(aChangedDataPromises)

          const oEntity = await oDataContext.requestObject()

          return this._initContext(arguments, oEntity)
      },

      delete: async function({sPath, sID, oContext}){
        const oSettings = {
          $filter: `ID eq ${sID}`
        }
  
        const oDataBindList = this._oDataBindingList(sPath, oContext, oSettings);

        const [ oDataContext ] = await oDataBindList.requestContexts()

        oDataContext.delete()

        return this._initContext(arguments)
      },
    };
  });