const cors = require('cors'); // 确保这行在最上面引入

var createError = require('http-errors');
var express = require('express');


app.use(cors({
    origin: [
        'http://localhost:8080',       // 本地开发后台
        'http://localhost:5173',       // 本地开发门户
        'https://ecm-system.vercel.app', // 你的线上前端地址
        /\.vercel\.app$/               // 允许所有 vercel 子域名（方便预览）
    ],
    credentials: true
}));




var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const UserRouter = require("./routes/admin/UserRouter");
const NewsRouter = require("./routes/admin/NewsRouter");
const ProductRouter = require("./routes/admin/ProductRouter");

const webNewsRouter = require("./routes/web/NewsRouter");
const webProductRouter = require("./routes/web/ProductRouter");

const JWT = require('./util/JWT');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());              // 解析POST请求体，必须加！不然req.body拿不到数据
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//在这里面统一地注册路由，

app.use('/',webNewsRouter);   //不需要路由校验，所以放在路由校验中间件的前面
app.use('/',webProductRouter);


app.use((req,res,next)=>{           // 中间件
  //如果token有效，next（）
  //如果token过期 返回401错误给前端
  //如果第一次进入接口，先放行
  if(req.url==="/adminapi/user/login"){      //如果第一次进入login，先放行      需要写===才是比较
    next()
    return;   
  }
  const token = req.headers["authorization"].split(" ")[1]    //取出token值      .split("")[1]:把Bearer $(token)以空格分割成两块，取下标为1的一块
  if(token){               //if(token) 只检查 token 存不存在，jwt.verify() 还要检查 token 有没有被篡改、有没有过期。
    var payload = JWT.verify(token)
    //console.log(payload)
    if(payload){
      const newToken = JWT.generate({       //如果没有这个，即使一直刷新页面也会过期，过了第一次的那60s必过期
        _id:payload._id,
        username:payload.username
      },"1d")        //重新生成token
      res.header("Authorization",newToken)  //逗号写成了点    只要没有返回body就不会结束继续next走
      next()
    }else{
      res.status(401).send({errCode:"-1",errorInfo:"token过期"})//up说：其实这个时候前端已经不关系这个信息了
    }
  }

})
//路由注册，因为放在token校验之后，所以只有在token校验完成后才执行路由注册
app.use('/',UserRouter);
app.use('/',NewsRouter);
app.use('/',ProductRouter)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
