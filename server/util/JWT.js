//jsonwebtoken能自动计算过没过期，比原始的JET模块更好用
const jsonwebtoken = require("jsonwebtoken")
const secret = "aaacc"      //密钥
const JWT = {
    generate(value,expires){            //负责生成token
        return jsonwebtoken.sign(value,secret,{expiresIn: expires})    //{expiresIn: expires}过期时间
    },      
    verify(token ){                           //负责验证token
        try{
            return jsonwebtoken.verify(token,secret)

        }catch(e){                  //e是error的意思
            return false
        }
    }
}
/* const token = JWT.generate({name:"aaaccc"},"60s")
//console.log(JWT.verify(token))

setTimeout(()=>{console.log(JWT.verify(token))},60000)      //1s=1000  如果过时 */

module.exports =JWT;