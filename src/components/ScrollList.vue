<template>
    <el-button class="button" type="primary" style="margin-left: 16px" @click="drawer = true">
        >
    </el-button>

    <el-drawer v-model="drawer" title="I'm outer Drawer" size="20%" :modal="false" :close-on-click-modal="false"
        modal-class="modal" direction="ltr">
        <h1 class="drawer_title">{{ name }}</h1>

        <div class="infinite-list" v-infinite-scroll="load" infinite-scroll-distance="10"
            :infinite-scroll-disabled="disabled" style="overflow: auto">

            <div class="postList">
                <div v-for="post in posts" :key="posts.articleId">
                    <SinglePost @click-child="clickEven" :post="post" ref="postRef"></SinglePost>
                </div>
            </div>

            <!-- <div class="article">
                    <ArticleDetail ref="articleRef"></ArticleDetail>
                </div> -->
        </div>


    </el-drawer>
</template>
  
<script lang="ts" setup>
import axios from 'axios';
import { computed, inject, ref, toRefs } from 'vue'
import SinglePost from './SinglePost.vue';
import ArticleDetail from '@/components/article/ArticleDetail.vue';
const posts = ref(Array);
const drawer = ref(false);
const innerDrawer = ref(false);
const loading = ref(false);
const disabled = computed(() => loading.value);

defineProps({
    name: String
});
// const name:any = inject('chooseName');
var pageSize = 10;
// console.log('name in ScrollList:' + name.value);

var isDetail = false;

var postName = ref();
const postRef = ref();
const articleRef = ref();
// 文章概览点击事件 -> 详细文章
const clickEven = (val: { content: string }) => {
    isDetail = true;
    articleRef.value.fetchArticle(val);
    articleRef.value.fetchComments(val);
    postName.value = val;
    console.log('postName in ScrollList: ' + postName.value);
};

const load = async (name: string) => {
    try {
        loading.value = true;
        let data: any;
        await axios({
            method: 'post',
            url: '/areaarticle',
            data: {
                areaId: 'a',
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

        loading.value = false;
    } catch (error) {
        console.log(error);
    }
};

// 暴露load方法
defineExpose({ load });

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

.modal {
    pointer-events: none;
    opacity: 0.9;
}

.el-drawer {
    pointer-events: auto;

}

.button {
    position: absolute;
    top: 50%;
    left: 0;
    z-index: 1000;
}

.drawer_title {
    text-align: center;
    font-size: 2em;
    margin: auto;
}
</style>
  

