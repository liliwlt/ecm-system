const ProductService = require("../../services/web/ProductService")

const ProductController = {
    getlist:async(req,res)=>{
        const result = await ProductService.getlist({_id:req.params.id})
        res.send({
            ActionType:"ok",
            data:result
        })

    }
}

module.exports = ProductController