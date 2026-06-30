<template>
    <div>
        <el-aside :width="$store.state.isCollapsed ? '65px' : '200px' ">
            <el-menu :collapse="$store.state.isCollapsed" 
            :collapse-transition="false"
            :router="true"  
            :default-active="route.fullPath"                
            >                    <!--  index作跳转路径  :router="true" 开启路由导航模式，把index="/home"当作路径来跳转-->
            <!-- route.fullPath = 当前页面完整的 URL 路径 index作匹配路径  -->

                <el-menu-item index="/home">                    <!-- 一级菜单  index="/home"既可以作跳转路径用也可以作匹配路径用  -->
                    <el-icon>
                        <HomeFilled />  <!-- 使用方法 -->
                    </el-icon>
                    <span>首页 </span>
                </el-menu-item>
                <el-menu-item index="/center">                    <!-- 一级菜单 -->
                    <el-icon>
                        <Avatar />
                    </el-icon>
                    <span>个人中心 </span>
                </el-menu-item>

<!-- 用户 -->   <el-sub-menu index="/user-manage" v-admin>    <!-- 二级菜单 -->    <!-- /user-manage在这里只是作为一个不重名的名字来使用 -->                   
                    <template #title>
                        <el-icon><UserFilled /></el-icon>
                        <span>用户管理 </span>
                    </template>
                    <el-menu-item index="/user-manage/useradd">添加用户</el-menu-item>   <!-- 一级 -->
                    <el-menu-item index="/user-manage/userlist">用户列表</el-menu-item> 
                </el-sub-menu>

<!-- 新闻 -->   <el-sub-menu index="/news-manage">                     <!-- 二级菜单 -->
                    <template #title>
                        <el-icon>
                            <MessageBox />
                        </el-icon>
                        <span>新闻管理 </span>
                    </template>
                    <el-menu-item index="/news-manage/newsadd">创建新闻</el-menu-item>   <!-- 一级 -->
                    <el-menu-item index="/news-manage/newslist">新闻列表</el-menu-item> 
                </el-sub-menu>

<!-- 产品 -->   <el-sub-menu index="/product-manage">                     <!-- 二级菜单 -->
                    <template #title>
                        <el-icon>
                            <Reading />
                        </el-icon>
                        <span>产品管理 </span>
                    </template>
                    <el-menu-item index="/product-manage/productadd">添加产品</el-menu-item>   <!-- 一级 -->
                    <el-menu-item index="/product-manage/productlist">产品列表</el-menu-item> 
                </el-sub-menu>
                
            </el-menu>
        </el-aside>            <!-- 侧边栏 -->
    </div>
</template>
<script setup>
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'

const route = useRoute()                         //钩子
const store = useStore()


const vAdmin = {
    mounted(el){
        //console.log(el)
        if(store.state.userInfo.role!==1){
            el.parentNode.removeChild(el)
        }
    }
}

</script>
<style lang="scss" scoped>
.el-aside{
    height:100vh;
    .el-menu{
        height:100vh;           //让菜单的边条占据全屏幕
    }
}
</style>