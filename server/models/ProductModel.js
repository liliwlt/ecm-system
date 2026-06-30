const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProductType = {
    title:String,
    introduction:String,
    detail:String,
    cover:String,
    editTime:Date             //编辑时间
}
//user模型===>users集合（在mongodb中都叫集合
const ProductModel = mongoose.model("Product",new Schema(ProductType))//通过schema进行初始化

module.exports = ProductModel; 