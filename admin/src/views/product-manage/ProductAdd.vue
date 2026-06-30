<template>
    <div>
        <el-page-header content="添加产品" icon="" title="产品管理" />
        <el-form ref='productFormRef' :model="productForm" :rules="productFormRules" label-width="80px"
            class="demo-ruleForm">

            <el-form-item label="产品名" prop="title"> <!-- prop关联的属性 -->
                <el-input v-model="productForm.title" />
            </el-form-item>

            <el-form-item label="产品简要描述" prop="introduction">
                <el-input v-model="productForm.introduction" type="textarea" />
            </el-form-item>
            <el-form-item label="产品详细描述" prop="detail">
                <el-input v-model="productForm.detail" type="textarea" />
            </el-form-item>

            <el-form-item label="产品图片" prop="cover">
                <Upload :avatar="productForm.cover" @eventchange="handleChange" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm()">添加产品</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>
<script setup>
import {ref,reactive} from 'vue'
import upload from '@/util/upload'
import Upload from '@/components/upload/Upload'
import {useRouter} from 'vue-router'

const router = useRouter()
const productFormRef = ref()
const productForm = reactive({
    title:"",
    introduction: "",
    detail:"",   
    cover:"",
    file:null
})
const productFormRules = reactive({
    title: [{ required: true, message: '请输入产品名', trigger: 'blur' }],
    introduction: [{ required: true, message: '请输入简要介绍', trigger: 'blur' }],
    detail: [{ required: true, message: '请输入详细介绍', trigger: 'blur' }],
    cover: [{ required: true, message: '请上传产品图片', trigger: 'blur' }]
})

//每次选择完图片之后的回调
const handleChange = (file)=>{
    productForm.cover = URL.createObjectURL(file)
    productForm.file = file
}

const submitForm=()=>{
    //校验规则
    productFormRef.value.validate(async(valid)=>{
        if(valid){
            console.log(productForm)
            //后台通信
            await upload("/adminapi/product/add",productForm)
            router.push(`/product-manage/productlist`)
        }
    })
}




</script>
<style scoped>
.demo-ruleForm {
    margin-top: 50px;
}
</style>