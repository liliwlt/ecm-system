<template>
    <div>
        <el-page-header content="个人中心" icon="" title="企业门户管理"/>
        <el-row :gutter="20" class="row">           <!-- gutter改变里面格栅的间距 -->
            <el-col :span="8">
                <el-card class="card">
                    <el-avatar :size="100" :src="avatarUrl" />
                    <h3>{{ store.state.userInfo.username }}</h3>
                    <h3>{{ store.state.userInfo.role===1 ? '管理员' : '编辑员' }}</h3>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card>
                    <template #header>
                        <div class="card-header">
                            <span>个人信息</span>
                        </div>
                    </template>
                    <el-form
                        ref='userFormRef'          
                        :model="userForm"
                        :rules="userFormRules"
                        label-width="80px"
                    ><!-- ref='userFormRef'  -->
                        <el-form-item label="用户名" prop="username" >       <!-- prop关联的属性 -->
                            <el-input v-model="userForm.username" />
                        </el-form-item>

                        <el-form-item label="性别" prop="gender"  l>       
                            <el-select v-model="userForm.gender" placeholder="选择性别" style="width: 240px">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="个人介绍" prop="introduction" >       
                            <el-input v-model="userForm.introduction" type="textarea"/>
                        </el-form-item>
                        
                        <el-form-item label="头像" prop="avatar" >       
                            <Upload :avatar="userForm.avatar"
                            @eventchange="handleChange"/>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="submitForm()">更新</el-button>
                        </el-form-item>


                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script setup>
import {useStore} from 'vuex'
import {computed,ref,reactive} from 'vue'

import {ElMessage} from 'element-plus'
import upload from '@/util/upload'
import Upload from '@/components/upload/Upload'


const store = useStore()
const avatarUrl = computed(()=>store.state.userInfo.avatar ? 'http://localhost:3000'+store.state.userInfo.avatar : "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png")

const {username,gender,introduction,avatar} = store.state.userInfo     
Upload
const userFormRef = ref()
 const userForm = reactive({       
        username,
        gender,
        introduction,
        avatar,
        file:null 
})

const userFormRules = reactive({
    username: [   { required: true, message: '请输入名字', trigger: 'blur' }  ],
    gender: [    { required: true, message: '请选择性别', trigger: 'change' }  ],
    introduction: [    { required: true, message: '请输入介绍', trigger: 'blur' }  ],
    avatar: [    { required: true, message: '请上传头像', trigger: 'blur' }  ]
})

const options = [           
    {label:"保密",value:0},
    {label:"男",value:1},
    {label:"女",value:2}
]
//每次选择完图片之后的回调
const handleChange = (file)=>{
    userForm.avatar = URL.createObjectURL(file)
    userForm.file = file
}

//更新提交，校验
const submitForm= ()=>{
    userFormRef.value.validate(async(valid)=>{      
        if(valid){
            const res = await upload('/adminapi/user/upload',userForm)
            console.log(res.data)
            if(res.ActionType==="ok"){
                store.commit("changeUserInfo",res.data)
                ElMessage.success("更新成功")
            }
        }
    })

}

</script>
<style scoped lang="scss">      //嵌套需要scss
.el-row{
    margin-top:20px;
    .card{
        text-align:center;
    }
}
</style>