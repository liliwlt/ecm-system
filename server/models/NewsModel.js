const mongoose = require("mongoose")
const Schema = mongoose.Schema

const NewsType = {
    title:String,
    content:String,
    category:Number,      //类别，1，2，3
    cover:String,
    isPublish:Number,        //未发布，已发布
    editTime:Date             //编辑时间
}
//user模型===>users集合（在mongodb中都叫集合
const NewsModel = mongoose.model("news",new Schema(NewsType))//通过schema进行初始化

module.exports = NewsModel; 