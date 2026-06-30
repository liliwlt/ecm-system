var express = require('express');
var ProductRouter = express.Router();
var ProductController = require('../../controllers/web/ProductController');



ProductRouter.get(`/webapi/product/list`,ProductController.getlist)
/* ProductRouter.get(`/webapi/product/list/:id`,ProductController.getlist)
ProductRouter.get(`/webapi/product/toplist`,ProductController.getToplist)
ProductRouter.get(`/webapi/product/toplist/:id`,ProductController.getToplist) */

module.exports = ProductRouter