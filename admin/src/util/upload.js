//import axios from 'axios'
import axios from '@/util/axios.config'
    //更新提交，校验
function upload ( path,userForm){
    console.log("submit",userForm)
    const params = new FormData()
    for(let i in userForm) {            
        params.append(i,userForm[i])
    }
        return axios.post(path,params,{         
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }).then(res=>res.data)
}


export default upload