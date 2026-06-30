const ProductService = require("../../services/admin/ProductService")
const JWT = require("../../util/JWT")

const ProductController = {
    add:async(req,res)=>{           
        //console.log(req.file,req.body)

        //数据整合后给到service处理
        const cover = req.file ? `/Productuploads/${req.file.filename}` : ""
        const {title,introduction,detail} = req.body

        //调用service进行增
        await ProductService.add({
            title,introduction,detail,cover,
            editTime:new Date()
        })
        res.send({  
            ActionType:"ok"
        })

    },
    getlist:async(req,res)=>{
        const result = await ProductService.getlist({_id:req.params.id})
        res.send({
            ActionType:"ok",
            data:result
        })

    },
    delList:async(req,res)=>{
        await ProductService.delList({_id:req.params.id})
        res.send({
            ActionType:"ok",
        })
    },
    updatelist:async(req,res)=>{
        const cover = req.file ? `/Productuploads/${req.file.filename}` : ""
        const {title,introduction,detail,_id} = req.body        
        await ProductService.updatelist({
            _id,
            title,
            introduction,
            detail,
            cover,
            editTime:new Date()             //editTime在解构的时候不写，因为传来的数据里没有最新时间，在传给service的时候要加editTime
        })
        res.send({
            ActionType:"ok",
        })
    } 
}

module.exports = ProductController