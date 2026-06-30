var express = require('express');
var ProductRouter = express.Router();
var ProductController = require('../../controllers/admin/ProductController');

//导入中间件
const multer  = require('multer')
const upload = multer({ dest: 'public/Productuploads/' })   

//涉及到文件上传，普通的post不行，需要加multer中间件
ProductRouter.post("/adminapi/product/add",upload.single("file"),ProductController.add)
ProductRouter.get(`/adminapi/product/list`,ProductController.getlist)
ProductRouter.get(`/adminapi/product/list/:id`,ProductController.getlist)
//ProductRouter.put(`/adminapi/product/publish`,ProductController.publish)
//ProductRouter.delete(`/adminapi/product/list/:id`,ProductController.delList)
 
ProductRouter.post("/adminapi/product/list",upload.single("file"),ProductController.updatelist)
 
module.exports = ProductRouter