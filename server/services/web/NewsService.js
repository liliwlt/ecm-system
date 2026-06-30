const NewsModel = require("../../models/NewsModel")

const NewsService = {
    getlist:async({_id})=>{
        return _id ? NewsModel.find({_id,isPublish:1}) 
        : NewsModel.find({isPublish:1}).sort({editTime:-1})     //sort({EditTime:-1}) 逆序排序//刚才写成了EditTime，使得排序不起作用
    },
    getToplist:async({limit})=>{
        return NewsModel.find({isPublish:1}).sort({editTime:-1}).limit(limit)
    }
}

module.exports = NewsService