//一旦将这个文件引入到node项目中，就相当于利用mongoose连接已经启动好的mongodb的服务


const mongoose = require("mongoose")


mongoose.connect("mongodb://127.0.0.1:27017/company-system")
  .then(() => console.log("✅ 数据库连接成功！"))
  .catch(err => console.error("❌ 数据库连接失败：", err));
//company-system就是将来要创建的数据库的名字