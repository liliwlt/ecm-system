const ProductModel = require("../../models/ProductModel")

const ProductService = {
    getlist:async({_id})=>{
        return _id ? ProductModel.find({_id}) : ProductModel.find({})     //sort({EditTime:-1}) 逆序排序//刚才写成了EditTime，使得排序不起作用
    }
}

module.exports = ProductService