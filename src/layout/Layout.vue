<script setup lang="ts">
import PostList from '@/components/PostList.vue';
import Scene from '../components/scene/Scene.vue'
import BDInfo from '@/components/BDInfo.vue';
import { provide, ref } from 'vue';
import Drawer from '@/components/Drawer.vue';
import ScrollList from '@/components/ScrollList.vue';
import ArticleDetail from '@/components/article/ArticleDetail.vue';
import UserPanel from '@/components/UserPanel.vue';

const scrollRef = ref();
const drawerRef = ref();

var chooseName = ref();
const scene = ref();
const clickEven = (val: { content: string; }) => {
    //   console.log(val);
    //   console.log(val); 
    // 加载
    chooseName.value = val;
    scrollRef.value.load(val);

    console.log('chooseName in Layout:' + chooseName.value);
}

</script>

<template>
    <el-container>
        <el-header>

        </el-header>

        <el-aside style="width:100%;height: 100vh;">
            <ScrollList class="scroll" ref="scrollRef"></ScrollList>
            <UserPanel class="scroll"></UserPanel>
        </el-aside>

        <Scene ref="scene" @click-child="clickEven"></Scene>



    </el-container>
</template>

<style>
.scroll {
    z-index: 1000;
}

.common-layout {
    display: box;
    width: 80%;
    text-align: center;
    align-items: center;
    align-content: center;
    justify-content: center;
}

.menu {
    text-align: center;
    height: 80%;
    width: 80%;
}
</style>