<template>
    <div>
        <el-header>
            <div class="left">
                <el-icon @click="handleCollapsed" :size="30"><Menu /></el-icon> 
                <span style="margin-left:10px;">企业门户网站管理系统</span>
            </div>
            <div class="right">
                <span>欢迎{{store.state.userInfo.username}}回来</span>
                
                <el-dropdown>               <!-- 下拉菜单 -->
                <span class="el-dropdown-link"><el-icon :size="30" style="color:aliceblue"><User /></el-icon></span>
                <template #dropdown>
                <el-dropdown-menu>          
                    <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
                    <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
                
            </div>
        </el-header>                     <!-- 导航栏 -->
        
    </div>
</template>
<script setup>
    import {useStore} from 'vuex' 
    import {useRouter} from 'vue-router'       
    const store = useStore()
    const handleCollapsed =()=>{
        store.commit("changeCollapsed")
    }
     
    const router = useRouter()         
    const handleCenter = ()=>{
        router.push("/center")      
    }
    const handleLogout = ()=>{           //退出，跳转登录页面
        localStorage.removeItem("token")    //清除token，只用这一句
        store.commit("clearUserInfo")       //清空用户信息，
        router.push("login")                
    }


</script>
<style lang="css" scoped>
.el-header{
    background-color: blueviolet;
    color: rgb(255, 255, 255);
    width:100hv;
    height:60px;
    line-height:60px;            
    display:flex;
    justify-content:space-between;
    align-items:center;
}
.left,.right{
    display:flex;
}
.left{
    i{                   
        margin:auto;
        cursor:pointer;         /* 鼠标放上去变成小手 */
    }
}
.right{
    .el-dropdown{
        margin:auto;
    }
}
</style>