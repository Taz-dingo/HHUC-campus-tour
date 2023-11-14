<template>
    <div 
    v-infinite-scroll="load" 
    infinite-scroll-distance="0"
    infinite-scroll-delay="200" 
    class="infinite-list" 
    style="overflow: auto">
        <!-- <li v-for="i in count" :key="i" class="infinite-list-item">
            {{ i }}
        </li> -->
        <el-scrollbar >
            <div v-for="post in posts" :key="posts.articleId">
                <SinglePost :post="post"></SinglePost>
            </div>
        </el-scrollbar>

    </div>
</template>
  
<script lang="ts" setup>
import axios from 'axios';
import { inject, ref, toRefs } from 'vue'
import SinglePost from './SinglePost.vue';
const posts = ref(Array);

const name:any = inject('chooseName');
var pageSize = 8;
console.log('name in ScrollList:' + name.value);

const load = async () => {
    try {

        let data: any;
        await axios({
            method: 'post',
            url: '/areaarticle',
            data: {
                areaId: name.value,
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
</style>
  