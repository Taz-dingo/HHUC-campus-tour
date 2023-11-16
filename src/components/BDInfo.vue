<template>
    <div class="BDInfoContainer">
        <h3 class="BDName">
            {{ name }}
        </h3>
        <div class="block">
            <h3 class="demonstration">图书馆</h3>
            
            <el-carousel height="300px">
                <el-carousel-item v-for="item in 4" :key="item">
                    <img v-if="item==1" style="height: 100%;" src="../../public/static/img/library/1.jpg">
                    <img v-if="item==2" style="height: 100%;" src="../../public/static/img/library/2.jpg">
                    <img v-if="item==3" style="height: 100%;" src="../../public/static/img/library/3.jpg">
                    <img v-if="item==4" style="height: 100%;" src="../../public/static/img/library/4.jpg">
                </el-carousel-item>
            </el-carousel>
        </div>

        <el-divider />

        <p class="intro">{{ intro }}</p>
    </div>
</template>>

<script lang="ts" setup>
const props = defineProps({
    name: String,    // 选中物体名
    intro: String    // 物体简介
})

</script>


<style>
.demonstration{
    text-align: center;
}
 .BDInfoContainer {
    width: 350px;
}

.BDName {
    text-align: center;
}

.block {
    width: 100%;
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

.intro {
    text-indent: 2em;
    margin: auto;
    padding: 5%;
}
</style>