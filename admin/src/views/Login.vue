<template>
  <div>
    
    <div class="formContainer">
      <h3>企业门户网站</h3>
      <el-form 
        ref="loginFormRef"        
        style="max-width: 600px" 
        :model="loginForm"   
        :rules="loginRules"
        label-width="auto" 
        class="demo-ruleForm"
        >
        <el-form-item label="用户名" prop="username" >
          <el-input 
            v-model="loginForm.username" 
            autocomplete="off" 

          />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input 
            v-model="loginForm.password" 
            type="password" 
            autocomplete="off" 
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm()">   登录  </el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>

</template>

<script setup>
import {reactive,ref} from 'vue'
import {useRouter} from 'vue-router'
//import axios from 'axios'
import axios from '@/util/axios.config'
import { ElMessage } from 'element-plus'
import {useStore} from 'vuex'
const store = useStore()
const loginForm = reactive({    
  username:"",
  password:""
})
const loginFormRef = ref()    

const loginRules = reactive({   
    username:[{   required:true,message:"请输入用户名",trigger:"blur"}],   
    password:[{  required:true,message:"请输入密码",trigger:"blur"}] 
})
//通过钩子来调用，不用this来访问 
const router = useRouter()

const submitForm = () =>{
  //1，校验表单
  loginFormRef.value.validate((valid)=>{       
    console.log(valid)
    if(valid){                                   

      axios.post("/adminapi/user/login",loginForm).then(res=>{
        console.log(res.data)
        if(res.data.ActionType==="ok"){
          store.commit("changeUserInfo",res.data.data)
          store.commit("changeGetterRouter",false)
          console.log("现在changeGetterRouter是:",store.state.isGetterRouter)
          router.push("/home") 
        }else{
          ElMessage.error('用户名与密码不匹配。')
          
        }
      })
    }
  })
}
//1，校验表单
//2，拿到表单内容
//3，设置token  const handlelogin = () => {
//  localStorage.setItem("token", "aaaab")
//  console.log("登录成功")
//}



</script>



<style lang="scss" scoped>

.formContainer{
  width:500px;
  height:300px;
  position:fixed;
  left:50%;
  top:50%;
  transform:translate(-50%,-50%);
  background: rgba($color: rgb(99, 139, 41), $alpha:0.5);
  color:rgb(218, 177, 181);
  text-align:center;
  padding:20px;
}
/* 
:v-deep .el-form-item___label{          //深度选择  无法改变label的样式
  color:rgb(239, 7, 7) ;                //:v-deep或是！important或是:label-style="{ color: 'black' }"都没有用，跳过
} */
h3{
  font-size:30px;
  color:rgb(79, 79, 79);
  padding:30px;
}



</style>
