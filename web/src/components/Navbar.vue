<template>
    <div class="navbar">
        <el-menu
            :default-active="route.fullPath"
            class="el-menu-demo"
            mode="horizontal"       
            @select=""
            :router="true"
        ><!-- mode="horizontal" 水平方向 /// :default-active=""一般配合router使用，高亮显示 ///fullPath是当前路径  -->
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/news">新闻中心</el-menu-item>
            <el-menu-item index="/product">产品与服务</el-menu-item>
            <el-menu-item index="" @click="handleClick">登录</el-menu-item>     <!-- 等之后两个项目编译完了部署在后端之后可以用index路径跳转，现在不行 -->
        </el-menu>
        <div class="right">
            企业门户官网
        </div>
    </div>
</template>   
<script setup>
import {useRoute} from 'vue-router'

const route = useRoute()

const handleClick = ()=>{
    window.location = "http://localhost:8080"
}

</script> 
<style lang="css" scoped>
.navbar{
    position:sticky;
    top:0px;
    z-index:1000;
}
.right{
    position:fixed;
    top:0;
    right:20px;
    widows:100px;
    height:60px;
    line-height:60px;
    text-align:center;
}


</style>