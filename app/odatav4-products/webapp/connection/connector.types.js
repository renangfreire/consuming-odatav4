
function _connector(){
    /**
     * Parâmetros de URL do UI5, {@link https://www.odata.org/getting-started/basic-tutorial/ Informações}
     * @typedef {Object} mParameters
     * @property {strin=} [$expand] - Especifica os relacionamentos a serem expandidos.
     * @property {string} [$filter] - Filtra todos os dados por alguma query, olhe o link dos params. 
     * @property {string} [$orderby] - Ordena os resultados.
     * @property {string} [$select] - Seleciona as propriedades.
     * @property {'$auto'|'$auto.*'|'$direct'} [$$groupId] - Define do GroupId da operação.
     * @property {'$auto'|'$auto.*'|'$direct'} [$$updateGroupId] - Atualize o groupId para essa operação.
     * @property {boolean} [$$canonicalPath] - Determina se um caminho canônico deve ser usado para a solicitação (chatGPT translate).
     * @property {boolean} [$$inheritExpandSelect] - Herda o expand e select anteriormente selecionado no contexto pai.
     * @property {boolean} [$$ownRequest] - Força uma request separada para essa chamada.
     * @property {boolean} [$count] - Conta o total de dados encontrados, não se limita ao limite da requisição.
     */

    /** 
     * Read mais performático, porém não possui suporte para Filter e Sort do próprio UI5.
     * @callback read
     * @param {object} data - dados para requisição
     * @param {string} data.sModelName - Nome da model dentro da manifest
     * @param {string} data.sPath - Caminho da requisição
     * @param {mParameters=} data.oURLParams - Parâmetros adicionais de URL.
     * @param {sap.ui.model.odata.v4.Context=} data.oContext - Contexto do componente UI5
     * @returns {Promise<any>} Resposta com os dados da requisição feita
     */

    /** 
     * Read menos performático, porém possui suporte para Filter e Sort do próprio UI5.
     * @callback readListBinding
     * @param {object} data - dados para requisição
     * @param {string} data.sModelName - Nome da model dentro da manifest
     * @param {string} data.sPath - Caminho da requisição
     * @param {mParameters=} data.oURLParams - Parâmetros adicionais de URL.
     * @param {sap.ui.model.odata.v4.Context=} data.oContext - Contexto do componente UI5
     * @param {sap.ui.model.Filter=} data.oFilter - Filtro do próprio UI5
     * @param {sap.ui.model.Sorter=} data.oSort - Sort do próprio UI5
     * @returns {Promise<array>} Resposta com os dados da requisição feita
     */

    /** 
     * Create.
     * @callback create
     * @param {object} data - dados para requisição
     * @param {string} data.sModelName - Nome da model dentro da manifest
     * @param {object} data.oData - Dados a serem criados
     * @param {string} data.sPath - Caminho da requisição
     * @param {sap.ui.model.odata.v4.Context=} data.oContext - Contexto do componente UI5
     * @param {boolean} [data.bSkipRefresh=false]
     * @returns {Promise<object>} A entidade criada
     */

    /** 
     * Update.
     * @callback update
     * @param {object} data - dados para requisição
     * @param {string} data.sModelName - Nome da model dentro da manifest
     * @param {object} data.oChangedData - Dados a serem atualizados
     * @param {string} data.sPath - Caminho da requisição
     * @param {string=} data.sID - ID do elemento que desejamos DELETAR
     * @param {mParameters=} data.oURLParams - Parâmetros adicionais de URL.
     * @param {sap.ui.model.odata.v4.Context=} data.oContext - Contexto do componente UI5
     * @param {sap.ui.model.Filter=} data.oFilter - Filtro do próprio UI5
     * @param {sap.ui.model.Sorter=} data.oSort - Sort do próprio UI5
     * @returns {Promise<object>} a Entidade Editada
     */

    /** 
     * UpdateMany, quando quiser atualizar +1 dado sem necessariamente enviar um ID, ex: emails com final @lab2dev.com.
     * @callback updateMany
     * @param {object} data - dados para requisição
     * @param {string} data.sModelName - Nome da model dentro da manifest
     * @param {object} data.oChangedData - Dados a serem atualizados
     * @param {string} data.sPath - Caminho da requisição
     * @param {mParameters=} data.oURLParams - Parâmetros adicionais de URL.
     * @param {sap.ui.model.odata.v4.Context=} data.oContext - Contexto do componente UI5
     * @param {sap.ui.model.Filter=} data.oFilter - Filtro do próprio UI5
     * @param {sap.ui.model.Sorter=} data.oSort - Sort do próprio UI5
     * @returns {Promise<object>} a Entidade Editada
     */
    
    /** 
     * Delete.
     * @callback delete
     * @param {object} data - dados para requisição
     * @param {string} data.sModelName - Nome da model dentro da manifest
     * @param {string} data.sPath - Caminho da requisição
     * @param {sap.ui.model.odata.v4.Context=} data.oContext - Contexto do componente UI5
     * @param {string} data.sID - ID do elemento que desejamos DELETAR
     * @returns {Promise<void>} Somente uma promise se foi Apagado com sucesso!
     */

    /**
     * @typedef  {object} connector
     * @property {read} read
     * @property {readListBinding} readListBinding
     * @property {create} create
     * @property {update} update
     * @property {updateMany} updateMany
     * @property {delete} delete
     */

    /**
     * @type connector
     */

    // @ts-ignore
    const connector = {}

    return connector
}

module.exports = _connector()