/* console.log(__dirname);  // 查看当前目录
console.log(require.resolve("../../models/UserModel"));  // 查看解析路径 */

const UserModel = require("../../models/UserModel")




const UserService = {
    login:async({username,password})=>{
        console.log("UserService 接收:", { username, password });
        return UserModel.find({
            username,
            password
        })
    },
    upload:async({_id,username,introduction,gender,avatar})=>{
        if(avatar){
            return UserModel.updateOne({
                _id
            },
            {
                username,introduction,gender:Number(gender),avatar
            })             //利用模型更新数据库
        }else{
            return UserModel.updateOne({
                _id
            },
            {
                username,introduction,gender:Number(gender)
            })             //不更新头像，更新其他的
        }
    },
    add:async({username,introduction,gender,avatar,role,password})=>{
        console.log("UserService 接收:", { username, password });
        return UserModel.create({
            username,introduction,gender,avatar,role,password
        })
    },
    getList:async ({id})=>{     //是id不是_id
        return id ? UserModel.find({_id:id},["username","introduction","password","role"]) 
                : UserModel.find({},["username","introduction","gender","avatar","role"])    //传所有的，如果要查找单个的就传_id
    },
    putList:async (body)=>{         //不是{body}，这样是解构了body
        return UserModel.updateOne({_id:body._id},body) 
    },
    delList:async({_id})=>{
        return UserModel.deleteOne({_id})
    }

}

module.exports = UserService