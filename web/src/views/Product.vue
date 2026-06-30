<template>
    <div>
        <el-carousel height="calc(100vh - 60px)" direction="vertical" :autoplay="false" v-if="looplist.length">
            <el-carousel-item v-for="item in looplist" :key="item._id">
                <div class="item" :style="{ backgroundImage: `url(http://localhost:3000${item.cover})` }">

                    <el-card class="card">
                        <template #header>
                            <div class="card-header">
                                <h2>{{item.title}}</h2>
                            </div>
                        </template>
                        <p>{{ item.introduction }}</p>
                        <p class="detail">{{ item.detail }}</p>
                        <p class="more"> 更多信息请访问：<br>http://11111111 </p>
                    </el-card>

                </div>
            </el-carousel-item>
        </el-carousel>
        <el-empty description="暂无产品" v-else />
    </div>



</template>
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
const looplist = ref([])
onMounted(async () => {
    const res = await axios.get('/webapi/product/list')
    console.log(res)
    looplist.value = res.data.data
})

</script>
<style scoped lang="scss">
.item {
    width: 100%;
    height: 100%;
    background-image: cover;
}

.card {
    width: 50%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    :deep(.el-card__header) {
        padding: 8px 20px;  // 上下内边距减小（原来是 18px）
        min-height: auto;   // 去掉最小高度限制
        height: auto;      
    }
}
.detail,.more{
    margin-top:20px;
}
</style>