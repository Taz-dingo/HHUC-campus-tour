<script setup lang="ts">
import PostList from '@/components/PostList.vue';
import Scene from '../components/scene/Scene.vue'
import BDInfo from '@/components/BDInfo.vue';
import { provide, ref } from 'vue';
import Drawer from '@/components/Drawer.vue';
import ScrollList from '@/components/ScrollList.vue';
import ArticleDetail from '@/components/article/ArticleDetail.vue';

const scrollRef = ref();
const drawerRef = ref();

var chooseName = ref();

const scene = ref();
const clickEven=(val: { content: string; })=>{
//   console.log(val);
//   console.log(val); 
  // 加载
  scrollRef.value.load(val);
  chooseName.value=val;
  console.log('chooseName in Layout:'+chooseName.value);
}

</script>

<template>
    <el-container>
        <el-header></el-header>

        <el-aside>
            
            <ScrollList :name="chooseName" class="scroll" ref="scrollRef" ></ScrollList>
            <!-- <Drawer ref="drawerRef">
            </Drawer> -->

            <!-- <ArticleDetail :id="1"></ArticleDetail> -->
        </el-aside>

        <Scene ref="scene" @click-child="clickEven"></Scene>
        
    </el-container>
</template>

<style>
.scroll{
    z-index: 1000;
}

</style>