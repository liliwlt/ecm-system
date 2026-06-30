<template>
    <div class="tokenlose">
        <div class="text">登录时间太长，登录失效了</div>
        <div>
            <el-button type="primary" @click="goLogin">重新登录</el-button>
        </div>  
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goLogin = () => {
    localStorage.removeItem('token')
    router.push('/login')
}
</script>
<style scoped>
.tokenlose{
    display: flex;
    flex-direction: column;    /* 垂直排列 */
    align-items: center;       /* 水平居中 */
    justify-content: center;   /* 垂直居中 */
    height: 70vh;             /* 把内容放在页面偏上的位置 */
}
.text{
    color:tomato;
}
.primary{
    margin-top: 30px;           /* 用 padding 控制距离顶部距离 */
}
</style>