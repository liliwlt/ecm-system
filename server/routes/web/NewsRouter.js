var express = require('express');
var NewsRouter = express.Router();
var NewsController = require('../../controllers/web/NewsController');



NewsRouter.get(`/webapi/news/list`,NewsController.getlist)
NewsRouter.get(`/webapi/news/list/:id`,NewsController.getlist)
NewsRouter.get(`/webapi/news/toplist`,NewsController.getToplist)
NewsRouter.get(`/webapi/news/toplist/:id`,NewsController.getToplist)


module.exports = NewsRouter