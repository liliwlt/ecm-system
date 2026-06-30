<template>
    <el-row>
        <el-col :span="17" :offset="1">
            <div>
                <h2>{{ currentNews.title }}</h2>
                <div class="time">{{ whichTime(currentNews.editTime) }}</div>
                <el-divider><el-icon> <star-filled /> </el-icon></el-divider>
                <div v-html="currentNews.content"></div>
            </div>
        </el-col>
        <el-col :span="4" :offset="1" :pull="1">
            <el-card style="max-width: 480px">
                <template #header>
                    <div class="card-header">
                        <span style="font-size:16px;font-weight:bold;">最近新闻</span>
                    </div>
                </template>
                <div v-for="item in topNews" 
                    :key="item._id" 
                    class="text item"
                    style="padding:14px;"
                    @click="handleChange(item._id)"
                >
                    <div>{{item.title}}</div>
                    <div class="time">{{ whichTime(item.editTime )}}</div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>
<script setup>
import { onMounted,ref ,watchEffect,onBeforeUnmount} from 'vue'
import axios from 'axios'
import { useRoute,useRouter } from 'vue-router'
import moment from 'moment'

const topNews = ref([])

moment.locale("zh-cn");
const whichTime = (time) => {
    return moment(time).format('lll');
}

const route = useRoute()        //忘记加括号导致报id未定义

const router = useRouter()
const currentNews = ref({})
watchEffect(async () => {
    const res1 = await axios.get(`/webapi/news/list/${route.params.id}`)
    const res2 = await axios.get(`/webapi/news/toplist?limit=4`)      //limit=4就返回前四条，这里的问号前后不能加空格
    console.log(res2.data)                                      //因为controller里没有return数据给前端导致不显示
    currentNews.value = res1.data.data[0]
    topNews.value = res2.data.data
})//现在watchEffect好像不会在销毁当前页面跳转其他页面时还监听了，是更新了吗，解决方法在37，30min



const handleChange = (id)=>{
    console.log(id)
    router.push(`/new/${id}`)
}



</script>
<style lang="scss" scoped>
.el-row {
    margin-top: 30px;
}

.time {
    font-size: 13px;
    color: gray;
}
</style>