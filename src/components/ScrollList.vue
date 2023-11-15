<template>
    <el-button class="button" type="primary" style="margin-left: 16px" @click="drawer = true">
      >
    </el-button>
  
    <el-drawer 
    v-model="drawer" 
    title="I'm outer Drawer" 
    size="20%" 
    :modal="false"
    :close-on-click-modal="false"
    modal-class="modal"
    direction="ltr"
    >
        <h1 class="drawer_title">{{ name }}</h1>
        <div 
        v-infinite-scroll="load" 
        infinite-scroll-distance="10"
        infinite-scroll-delay="200" 
        class="infinite-list" 
        style="overflow: auto">
            <el-scrollbar >
                <div v-for="post in posts" :key="posts.articleId">
                    <SinglePost :post="post"></SinglePost>
                </div>
            </el-scrollbar>
        </div>

        <div>
            <el-button @click="innerDrawer = true">Click me!</el-button>
            
            <el-drawer
            v-model="innerDrawer"
            title="I'm inner Drawer"
            :append-to-body="true"
            :modal="false"
            :close-on-click-modal="false"
            modal-class="modal"
            aria-modal="false"
            size="19%"
            direction="ltr"
            >
                <ArticleDetail></ArticleDetail>
                <p>_(:зゝ∠)_</p>
            </el-drawer>
        </div>
    </el-drawer>
    
    
</template>
  
<script lang="ts" setup>
import axios from 'axios';
import { inject, ref, toRefs } from 'vue'
import SinglePost from './SinglePost.vue';
const posts = ref(Array);
const drawer = ref(false);
const innerDrawer = ref(false);
defineProps({
    name:String
});
// const name:any = inject('chooseName');
var pageSize = 8;
// console.log('name in ScrollList:' + name.value);

const load = async (name: string) => {
    try {

        let data: any;
        await axios({
            method: 'post',
            url: '/areaarticle',
            data: {
                areaId: name,
                page: 1,
                pagesize: pageSize
            }
        }).then(function (response) {
            if (response.data.data != null) {
                console.log(response.data.data);
                data = response.data.data;
                console.log(data);
            } else {
                // posts.value=[];
            }
        });
        if (pageSize <= data.length) {  // 如果没有取完所有数据，pageSize+=2
            pageSize += 2;
        }

        console.log(pageSize);
        posts.value = data;
    } catch (error) {
        console.log(error);
    }
};
// load('a');
defineExpose({load});

</script>
  
<style>
.infinite-list {
    width: 400px;
    height: 90%;
    padding: 0;
    margin: 0;
    list-style: none;
}

.infinite-list .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background: var(--el-color-primary-light-9);
    margin: 10px;
    color: var(--el-color-primary);
}

.infinite-list .infinite-list-item+.list-item {
    margin-top: 10px;
}

.modal{
      pointer-events: none;
      opacity: 0.9;
}

.el-drawer{
    pointer-events: auto;

}

.button{
    position: absolute;
    top:50%;
    left: 0;
    z-index: 1000;
}
.drawer_title{
    text-align: center;
    font-size: 2em;
    margin:auto;
}

</style>
  

