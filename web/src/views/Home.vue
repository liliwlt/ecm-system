<template>
    <div class="container">

        <el-carousel height="calc(100vh - 60px)">
            <el-carousel-item :key="1">
                <div :style="{backgroundImage:`url(${require('@/assets/1.jpg')})`}">
                    <!-- <h3 class="small justify-center" text="2xl">{{ item }}</h3> -->
                </div>
            </el-carousel-item>
            <el-carousel-item :key="2">
                <div :style="{backgroundImage:`url(${require('@/assets/2.jpg')})`}">
                    <!-- <h3 class="small justify-center" text="2xl">{{ item }}</h3> -->
                </div>
            </el-carousel-item>
            <el-carousel-item :key="3">
                <div :style="{backgroundImage:`url(${require('@/assets/3.jpg')})`}">
                    <!-- <h3 class="small justify-center" text="2xl">{{ item }}</h3> -->
                </div>
            </el-carousel-item>
            <el-carousel-item :key="5">
                <div :style="{backgroundImage:`url(${require('@/assets/5.jpg')})`}">
                    <!-- <h3 class="small justify-center" text="2xl">{{ item }}</h3> -->
                </div>
            </el-carousel-item>
        </el-carousel>
        <div class="center">互联网+时代</div>
    </div>



</template>
<script setup lang="scss">
.el-carousel div{
    width:100%;
    height:100%;
    background-size:cover;
}
.container{
    position:relative;

}
.center{
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    height:100px;
    line-height:100px;
    font-size:60px;
    color:white;
    text-align:center;
}

</script>