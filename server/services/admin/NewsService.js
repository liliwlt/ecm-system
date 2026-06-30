const NewsModel = require("../../models/NewsModel")

const NewsService = {
    add:async({title,content,category,cover,isPublish,editTime}) =>{        //将来解构出来
        return NewsModel.create({
            title,content,category,cover,isPublish,editTime
        })
    },
    getlist:async({_id})=>{
        return _id ? NewsModel.find({_id}) : NewsModel.find({})
    },
    publish:async({_id,isPublish,editTime})=>{
        return NewsModel.updateOne({_id},{isPublish,editTime})//前面的索引，后面的是要改变的数据项
    },
    delList:async({_id})=>{
        return NewsModel.deleteOne({_id})
    },
    updatelist:async({title,content,category,isPublish,editTime,_id,cover})=>{
        if(cover){
            return NewsModel.updateOne({_id},{title,content,category,isPublish,editTime,cover})             //利用模型更新数据库
        }else{
            return NewsModel.updateOne({_id},{title,content,category,isPublish,editTime})  
        }
    }
}

module.exports = NewsService