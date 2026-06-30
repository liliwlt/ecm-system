<template>
    <div>
        
        <el-card class="card">
            <el-page-header content="用户列表" icon="" title="用户管理" />
            <el-table :data="tableData" style="width: 100%" >
                <el-table-column prop="username" label="用户名" width="180" />
                <el-table-column  label="头像" width="180">            
                <template #default="scope">
                    <div v-if="scope.row.avatar">     
                        <el-avatar :siaze="50" :src="'http://localhost:3000'+scope.row.avatar"></el-avatar>

                    </div>
                    <div v-else>
                        <el-avatar :siaze="50" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
                    </div>
                </template>
                </el-table-column>
                    
                <el-table-column  label="角色" width="180">              
                <template #default="scope">
                    <el-tag type="success" v-if="scope.row.role===1">管理员</el-tag>
                    <el-tag type="danger" v-if="scope.row.role===2">编辑</el-tag>
                    
                </template>
                </el-table-column>

                <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.row)">
                    编辑
                    </el-button>

                    <el-popconfirm title="确定要删除吗?" 
                    confirm-button-text="确定" 
                    cancel-button-text="不要"
                    @confirm="handleDelete(scope.row)"
                    >
                        <template #reference>      
                            <el-button size="small" type="danger" >
                            删除
                            </el-button>
                        </template>

                    </el-popconfirm>

                </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog          
            v-model="dialogVisible"
            title="Tips"
            width="500"
        >           <!-- 插槽 -->

            <el-form 
            ref='userFormRef' 
            :model="userForm" 
            :rules="userFormRules" 
            label-width="80px"
            class="demo-ruleForm"
            >
                <el-form-item label="用户名" prop="username"> 
                    <el-input v-model="userForm.username" />
                </el-form-item>

                <el-form-item label="密码" prop="password"> 
                    <el-input v-model="userForm.password" type="password" />
                </el-form-item>

                <el-form-item label="角色" prop="role" l>
                    <el-select v-model="userForm.role" placeholder="选择权限" style="width: 240px">
                        <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>

                <el-form-item label="个人介绍" prop="introduction">
                    <el-input v-model="userForm.introduction" type="textarea" />
                </el-form-item>

            </el-form>
            <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleEditConfirm()">提交</el-button>
            </div>
            </template>
        </el-dialog>



    </div>
</template>
<script setup>
import {ref,reactive,onMounted} from 'vue'    
import axios from '@/util/axios.config'
import {useStore} from 'vuex'

const store = useStore()
const {username,role,introduction,password} = store.state.userInfo 

const userFormRef = ref()
let userForm = reactive({       //用const是常量，用let就能用userForm = res.data.data给userForm赋值了
    username:"",
    password:"",
    role: 2,        //1管理员，2编辑，默认是编辑的角色
    introduction:""
})
const userFormRules = reactive({
    username: [{ required: true, message: '请输入名字', trigger: 'blur' }],
    password: [{ required: true, message: '请选择密码', trigger: 'change' }],
    role: [{ required: true, message: '请选择权限', trigger: 'blur' }],
    introduction: [{ required: true, message: '请输入介绍', trigger: 'blur' }]
})
const options1 = [
    { label: "管理员", value: 1 },
    { label: "编辑", value: 2 }
]


const tableData = ref([])
onMounted(()=>{
    getTableData()
})

const getTableData = async()=>{
    const res = await axios.get("/adminapi/user/list")
    console.log(res.data)
    tableData.value = res.data.data
}
//编辑回调
const handleEdit = async(data)=>{
    //console.log(data)
    
    const res = await axios.get(`/adminapi/user/list/${data._id}`);    
    console.log(res.data.data)
    Object.assign(userForm,res.data.data[0])        //把后面的合并到前面的去


    dialogVisible.value = true
}
//编辑确认回调
const handleEditConfirm = ()=>{
        userFormRef.value.validate(async(valid)=>{
        if(valid){
            //1-更新后端     2-dialog隐藏       3-获取table数据
            await axios.put(`/adminapi/user/list/${userForm._id}`,userForm)
            dialogVisible.value = false
            getTableData();

        }
    })
}




const handleDelete = async(data)=>{
    console.log(data)
    await axios.delete(`/adminapi/user/list/${data._id}`)    
               //                          -----------动态路由的方式
    //reload page刷新页面，性能最不好    reload data刷新数据     tabledata本地删除，性能最好不用重新获取后端信息
    getTableData();

}

const dialogVisible = ref(false)




</script>
<style lang="css" scoped>
.el-table{
    margin-top:50px;
}
</style>