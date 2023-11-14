<template>
    <div class="BDInfoContainer">
        <h3 class="BDName" >
            {{ name }}
        </h3>
        <div class="block">
            <span class="demonstration"></span>
            <el-carousel height="150px">
                <el-carousel-item v-for="item in 4" :key="item">
                    <h3 class="small">{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>
        </div>

        <el-divider />

        <p class="intro">{{ intro }}</p>
    </div>

</template>>

<script lang="ts" setup>
    const props = defineProps({
        name:String,    // 选中物体名
        intro:String    // 物体简介
    })

</script>


<style>
    .BDInfoContainer{
        width:350px;
    }

    .BDName{
        text-align: center;
    }
    
    .block{
        width:100%;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    .intro{
        text-indent: 2em;
    }


</style>