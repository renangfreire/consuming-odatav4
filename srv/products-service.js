const cds = require("@sap/cds")

module.exports = function(){
        const {
            Products
        } = this.entities

        this.before("CREATE", "Products" , async (req, res) => {
            console.log(req.data)
            if(req.data.Name === "ERROR"){
                return req.reject(404, "Product already exists")
            }
        })
}