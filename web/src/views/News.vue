<template>
    <div class="container">
        <div class="news-header" :style="{backgroundImage:`url(${require('@/assets/12.png')})`}">
        </div>

        <!-- 搜索栏 -->
        <div class="search">
            <!-- 弹出框 -->
            <el-popover             
                placement="bottom"
                title="检索结果"
                width="50%"
                :visible="visible"
            >
                <template #reference>
                    <el-input
                        v-model="searchText"
                        class="responsive-input"
                        placeholder="请输入新闻关键字"
                        prefix-icon="Search"  
                        type="search"
                        size="large"   
                        @input="visible=true"   
                        @blur="visible=false"
                        style="width:50%;"
                    />      <!-- 如果是在文件里导入图标，就用：icon=“”，如果在main中导入图标就不用写： -->
                </template>

                <div v-if="searchnewslist.length">
                    <div v-for="data in searchnewslist" 
                        :key="data._id" 
                        class="search-item"
                        @mousedown="handelChangepage(data._id)"
                    ><!-- 上面这一行我把click改成了mousedown，比click更早触发，对触摸屏也有效 -->
                        {{ data.title }}
                    </div>
                </div>
                <div v-else><el-empty description="暂无新闻" :image-size="50" /></div>
            </el-popover>
        </div>

        <!-- 四分栅格新闻排序 -->
        <div class="topnews">
              <el-row :gutter="20"><!-- gutter控制列之间的间隔 -->
                <el-col :span="6" 
                    v-for="item in topNewslist" 
                    :key="item._id"
                >
                    <el-card style="max-width: 480px" shadow="hover" @click="handelChangepage(item._id)">
                        <template #footer class="foot">
                            <div>{{item.title}}</div>
                            <div class="time">{{ whichTime(item.editTime )}}</div>
                        
                        </template>
                        
                        <div class="image" :style="{backgroundImage:`url(http://localhost:3000${item.cover})`}"></div>

                    </el-card>
                </el-col>
                
            </el-row>
        </div>

        <!-- 按1，2，3分组， Tabs标签页   -->
        <div>
            <el-tabs v-model="whichTab" class="demo-tabs" style="margin:50px">
                <el-tab-pane 
                    :key="item.name"
                    v-for="item in tablist" 
                    :label="item.label" 
                    :name="item.name" 
                >          
                    <el-row :gutter="20"><!-- gutter控制列之间的间隔 -->
                        <el-col :span="18">
                            <div v-for="data in tabnews[item.name]" :key="data._id" style="padding:10px">

                                <el-card shadow="hover" @click="handelChangepage(data._id)">

                                    <div class="tab-image" :style="{backgroundImage:`url(http://localhost:3000${data.cover})`}"></div>
                                    <div style="padding:10px;float:left;">
                                        <div>{{data.title}}</div>
                                        <div class="tab-time">{{ whichTime(data.editTime )}}</div>
                                    </div>
                                    
                                </el-card>

                            </div>
                        </el-col>

                        <!-- 时间线 -->
                        <el-col :span="6">
                            <el-timeline>
                                <el-timeline-item
                                    v-for="(data,index) in tabnews[item.name]"
                                    :key="index"
                                    :timestamp=" whichTime(data.editTime )"
                                ><!-- data只在for里面存在，是当前项。timestamp 是 el-timeline-item 组件时间线组件的属性，用于显示时间戳。 -->
                                        {{data.title}}
                                </el-timeline-item>
                            </el-timeline>
                        </el-col>
                    </el-row>

                </el-tab-pane>
            </el-tabs>
        </div>

        <el-backtop />  <!-- 回到顶端 -->
    </div>
</template>
<script setup>
import {ref,onMounted,computed} from 'vue'
import axios from 'axios'
import moment from 'moment'         //时间
import _ from 'lodash'
import {useRouter} from 'vue-router'

moment.locale("zh-cn");

const router = useRouter()
const searchText = ref("")
const visible = ref(false)

const newslist = ref([])

const whichTab = ref(1)

onMounted(async()=>{
    var res = await axios.get("/webapi/news/list")
    //console.log(res.data)
    newslist.value = res.data.data
    console.log(_.groupBy(newslist.value,item=>item.category))
    
})

const searchnewslist = computed(()=>{
    const keyword = searchText.value.trim()     //先去除输入框内容前后空白，再判断是否为空
    if(keyword === ''){      return []    } 
    return newslist.value.filter(item=>item.title.includes(keyword))})
//箭头函数的写法要么是()=>{ return ...}要么是()=>...

const topNewslist = computed(()=>{ return newslist.value.slice(0,4)})   //妈的又没return，气死了

const whichTime = (time)=>{
        return moment(time).format('lll');
}

const tablist = [
    {label:"最新动态",name:1},
    {label:"典型案例",name:2},
    {label:"通知公告",name:3}
]

const tabnews = computed(()=>_.groupBy(newslist.value,item=>item.category))

const handelChangepage = (id) =>{
    //console.log(id)
    //router.push('/:id')
    router.push(`/new/${id}`)
}


</script>
<style lang="scss" scoped>
.container{
    position:relative;
}
.news-header{
    width:100%;
    height:500px;
    background-size:cover;
}
.search{
    position:absolute;
    top:300px;
    width:100%;
    text-align:center;

}

.search-item{
    height:50px;
    line-height:50px;
    &:hover{
        background:whitesmoke;
        color:red;
    }
}

.topnews{
    margin:20px;
    color:red;
    .image{
        width:100%;
        height:150px;
        background-size:cover;
    }
    .time{
        font-size:13px;
        color:grey;
    }

}
.tab-image{
    width:150px;
    height:100px;
    background-size:cover;
    float:left;
}
.tab-time{
    font-size:13px;
    color:grey;
}
.span{
    float:right;
}

</style>