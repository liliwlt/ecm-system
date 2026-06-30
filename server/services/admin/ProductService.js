const ProductModel = require("../../models/ProductModel")

const ProductService = {
    add:async({title,introduction,detail,cover,editTime}) =>{        //将来解构出来
        return ProductModel.create({
            title,introduction,detail,cover,editTime
        })
    },
    getlist:async({_id})=>{
        return _id ? ProductModel.find({_id}) : ProductModel.find({})
    },/*
    publish:async({_id,isPublish,editTime})=>{
        return NewsModel.updateOne({_id},{isPublish,editTime})//前面的索引，后面的是要改变的数据项
    },*/
    delList:async({_id})=>{
        return ProductModel.deleteOne({_id})
    },
    updatelist:async({title,introduction,detail,_id,editTime,cover})=>{
        if(cover){
            return ProductModel.updateOne({_id},{title,introduction,detail,editTime,cover})             //利用模型更新数据库
        }else{
            return ProductModel.updateOne({_id},{title,introduction,detail,editTime})  
        }
    } 
}

module.exports = ProductService