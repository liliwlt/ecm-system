//这里面只是一个普通的对象，把他导出去就行了
//const UserService = require("../../services/admin/UserService")
const UserService = require("../../services/admin/UserService")
const JWT = require("../../util/JWT")

const UserController = {

    login:async( req,res )=>{
        //用req.body接收前端发来的用户名密码什么的   
        var result = await UserService.login(req.body)           //在UserService里再具体的进行增删改查 
        // 上面这一行是在处理，处理完之后再决定给前端返回什么
        if(result.length===0){
            return res.send({
                code:"-1",
                error:"用户密码不匹配"
            })
        }else{
            //生成token
            const token = JWT.generate({
                _id:result[0]._id,
                username:result[0].username
            },"1d")
            res.header("Authorization",token)   //Authorization是授权的意思，不过可以随便写什么

            
            return res.send({
                ActionType:"ok",        //记得写，
                data:{
                    username:result[0].username,
                    gender:result[0].gender ?? 0,      //性别，0保密，1，2    如果 result[0].gender 的值是 null 或 undefined，就用 0，否则就用 result[0].gender 本身。
                    introduction:result[0].introduction,//简介
                    avatar:result[0].avatar,
                    role:result[0].role,        //管理员1，编辑2
                }
            })
        }
    },
    upload:async( req,res )=>{
        //console.log(req.body,req.file)
        const {username,introduction,gender} = req.body
        const token = req.headers["authorization"].split(" ")[1]    //取出token值 
        const avatar = req.file ? `/avataruploads/${req.file.filename}` : ""
        if(token){
            var payload = JWT.verify(token)
            //console.log(payload._id)
            await UserService.upload({_id:payload._id,username,introduction,gender:Number(gender),avatar})
            if(avatar){
                res.send({      //返回给前端
                    ActionType:"ok",
                    data:{
                        username,
                        introduction,
                        gender:Number(gender),
                        avatar

                    }
                })
            }else{
                res.send({      //返回给前端
                    ActionType:"ok",
                    data:{
                        username,
                        introduction,
                        gender:Number(gender)

                    }
                })
            }
        }
        
    },   
    add:async( req,res )=>{
        //console.log(req.body,req.file)
        const {username,introduction,gender,role,password} = req.body
        const avatar = req.file ? `/avataruploads/${req.file.filename}` : ""
        await UserService.add({username,introduction,gender:Number(gender),avatar,role:Number(role),password})
        if(avatar){
            res.send({      //返回给前端
                ActionType:"ok"
            })
        }  
    },
    getList:async(req,res)=>{       //如果这里不写req，res，会显示res未定义
        const result = await UserService.getList(req.params)
        res.send({      
            ActionType:"ok",
            data:result
        })
    },
    putList:async(req,res)=>{       //如果这里不写req，res，会显示res未定义
        const result = await UserService.putList(req.body)
        res.send({      
            ActionType:"ok",
            data:result
        })
    },
    delList:async(req,res)=>{       
        console.log(req.params.id)
        const result = await UserService.delList({_id:req.params.id})
        res.send({      
            ActionType:"ok"
        })
    }


} 
module.exports = UserController