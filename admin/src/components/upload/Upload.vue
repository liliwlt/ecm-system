<template>
    <el-upload 
        class="avatar-uploader" 
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false" 
        :auto-upload="false" 
        :on-change="handleChange"
        >
        <img v-if="props.avatar" :src="uploadAvatar" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
            <Plus />
        </el-icon>
    </el-upload>

</template>

<script setup>
import { defineEmits,defineProps,computed } from 'vue';


const props = defineProps({
    avatar:String
})
const emit = defineEmits(["eventchange"])

const uploadAvatar =computed(
    ()=>
    props.avatar.includes("blob")
        ? props.avatar
        : 'http://localhost:3000'+props.avatar
)

//每次选择完图片之后的回调
const handleChange = (file)=>{
    emit("eventchange",file.raw)
}

</script>

<style scoped lang="scss">
.el-carousel__item h3 {
  color: #475669;
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



.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {          
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

</style>