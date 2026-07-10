<template>
    <div>
        <el-card class="card">
            <el-page-header content="产品列表" icon="" title="产品管理" />
            <el-table :data="tableData" style="width: 100%" >
                <el-table-column prop="title" label="产品名称" width="180" />
                <el-table-column prop="introduction" label="简要描述" width="180" />

                <el-table-column label="更新时间" >              
                <template #default="scope">
                    {{ formatTime.getTime(scope.row.editTime) }} 
                </template>                   
                </el-table-column>
          


                <el-table-column label="操作">
                <template #default="scope">
                                    
                    <el-button circle size="small" icon="Edit"
                        @click="handleEdit(scope.row)"/>      
                       
                    <el-popconfirm title="确定要删除吗?" 
                    confirm-button-text="确定" 
                    cancel-button-text="不要"
                    @confirm="handleDelete(scope.row)"
                    >
                        <template #reference>       
                            <el-button circle size="small" icon="Delete" type="danger"/>  
                        </template>
                    </el-popconfirm>

                    <!-- 在el-table的插槽里，如果@click="handlePreview"这样写，handlePreview收到的是鼠标点击事件，而不是row数据。 -->
                </template>
                </el-table-column>
            </el-table>
        </el-card>

    </div>
</template>
<script setup>
import {ref,onMounted} from 'vue'
import axios from '@/util/axios.config'
import formatTime from '@/util/formatTime'
import {useRouter} from 'vue-router'

const router = useRouter()

const tableData = ref([])          

onMounted(()=>{
    getTableData()
})
const getTableData =async()=>{
    const res = await axios.get(`/adminapi/product/list`)
    console.log(res.data.data)
    tableData.value = res.data.data
}


//删除回调
const handleDelete =async(item)=>{
    await axios.delete(`/adminapi/product/list/${item._id}`)
    await getTableData()
}

//编辑回调
const handleEdit =(item)=>{
    router.push(`/product-manage/productedit/${item._id}`)

}


</script>
<style lang="css" scoped>
.el-table{
    margin-top:50px;
}
::v-deep .htmlcontent{
    img{
        max-width:100%;
    }
}


</style>