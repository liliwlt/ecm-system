const NewsService = require("../../services/web/NewsService")

const NewsController = {
    getlist:async(req,res)=>{
        const result = await NewsService.getlist({_id:req.params.id})
        res.send({
            ActionType:"ok",
            data:result
        })

    },
    getToplist:async(req,res)=>{
        const result = await NewsService.getToplist({limit:req.query.limit})
        res.send({
            ActionType:"ok",
            data:result
        })
    }
}

module.exports = NewsController