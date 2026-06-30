<template>
    <div>
         <el-page-header content="首页" icon="" title="企业门户管理"/>       
            <el-card class="card">
                <el-row>
                    <el-col :span="4">
                        <el-avatar :size="100" :src="avatarUrl" />
                    </el-col>
                    <el-col :span="20">
                        <h3 style="line-height:100px">
                            欢迎{{ store.state.userInfo.username }}回来，{{ welcomeText }}
                        </h3>
                    </el-col>

                </el-row>
            </el-card>
            <el-card class="card">
                <template #header>
                <div class="card-header">
                    <span>公司产品</span>
                </div>
                </template>
                <el-carousel v-if="loopList.length" :interval="4000" type="card" height="200px">
                    <el-carousel-item v-for="item in loopList" :key="item._id">
                        <div :style="{
                            backgroundImage:`url(http://localhost:3000${item.cover})`,
                            backgroundSize:'cover'
                        }"
                        >
                            <h3 >{{ item.title }}</h3>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </el-card>
    </div>
</template>
<script setup>
import {useStore} from 'vuex'
import {computed,onMounted,ref} from 'vue'
import axios from '@/util/axios.config'

const loopList = ref([])

const store = useStore()   //钩子
console.log(store.state)

const avatarUrl = computed(()=>store.state.userInfo.avatar ? 'http://localhost:3000'+store.state.userInfo.avatar : "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png")

const welcomeText = computed(()=>new Date().getHours()<12 ? '好好工作' : '该午休了')

onMounted(()=>{
    getData()
})
const getData =async()=>{
    const res = await axios.get(`/adminapi/product/list`)
    loopList.value = res.data.data
    console.log(loopList.value)
}


</script>


<style scoped>
.card{
    margin:20px;
}



.el-carousel__item h3 {
  color: #244e86;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

</style>