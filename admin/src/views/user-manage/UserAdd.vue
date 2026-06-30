<template>
    <div>
        <el-page-header content="添加用户" icon="" title="用户管理" />

        <el-form ref='userFormRef' :model="userForm" :rules="userFormRules" label-width="80px"
            class="demo-ruleForm">


            <el-form-item label="用户名" prop="username"> <!-- prop关联的属性 -->
                <el-input v-model="userForm.username" />
            </el-form-item>

            <el-form-item label="密码" prop="password"> <!-- prop关联的属性 -->
                <el-input v-model="userForm.password" type="password" />
            </el-form-item>

            <el-form-item label="性别" prop="gender"> <!-- prop关联的属性 -->
                <el-select v-model="userForm.gender" placeholder="选择性别" style="width: 240px">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>

            <el-form-item label="角色" prop="role" l>
                <el-select v-model="userForm.role" placeholder="选择权限" style="width: 240px">
                    <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>

            <el-form-item label="个人介绍" prop="introduction">
                <el-input v-model="userForm.introduction" type="textarea" />
            </el-form-item>

            <el-form-item label="头像" prop="avatar">
                <Upload :avatar="userForm.avatar" @eventchange="handleChange" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm()">添加用户</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import upload from '@/util/upload'
import Upload from '@/components/upload/Upload'
import {useRouter} from 'vue-router'

const userFormRef = ref()
const userForm = reactive({
    username: "",
    password: "",
    role: 2,         //1管理员，2编辑，默认是编辑的角色
    introduction: "",
    avatar: "",
    file: null,
    gender:0
})
const userFormRules = reactive({
    username: [{ required: true, message: '请输入名字', trigger: 'blur' }],
    password: [{ required: true, message: '请选择密码', trigger: 'change' }],
    gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
    role: [{ required: true, message: '请选择权限', trigger: 'blur' }],
    introduction: [{ required: true, message: '请输入介绍', trigger: 'blur' }],
    avatar: [{ required: true, message: '请上传头像', trigger: 'blur' }]
})

const options = [         
    {label:"保密",value:0},
    {label:"男",value:1},
    {label:"女",value:2}
]

const options1 = [
    { label: "管理员", value: 1 },
    { label: "编辑", value: 2 }
]
//每次选择完图片之后的回调
const handleChange = (file)=>{
    userForm.avatar = URL.createObjectURL(file)
    userForm.file = file
}


const router = useRouter()
//校验
const submitForm = ()=>{
    userFormRef.value.validate(async(valid)=>{
        if(valid){
            const res = await upload('/adminapi/user/add',userForm)
            router.push(`/user-manage/userlist`)
        }
    })
}




</script>
<style scoped>
.demo-ruleForm {
    margin-top: 50px;
}
</style>