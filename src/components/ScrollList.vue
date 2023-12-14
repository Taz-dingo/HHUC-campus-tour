<template>
    <el-button class="button" type="primary" style="margin-left: 16px" @click="drawer = true">
        >
    </el-button>

    <el-drawer v-model="drawer" title="I'm outer Drawer" size="25%" :modal="false" :close-on-click-modal="false"
        modal-class="modal" direction="ltr">

        <!-- 如果选中了建筑 -->
        <div class="main_container" v-if="objName !== '' && !isDetail">
            <h1 class="drawer_title">{{ objName }}</h1>
            <div class="infinite-list" v-show="!isDetail" v-infinite-scroll="load" infinite-scroll-distance="30"
                :infinite-scroll-disabled="disabled" infinite-scroll-immediate="false" style="overflow: auto">

                <div class="post_list">
                    <div v-for="post in posts" :key="posts.articleId">
                        <SinglePost @click-child="clickEven" :post="post"></SinglePost>
                    </div>
                </div>
            </div>
        </div>

        <!-- 如果没有选中建筑 -->
        <div v-if="objName === '' && !isDetail">
            <P>没有啦</P>
        </div>

        <!-- 如果选中了文章 -->
        <div class="article" v-show="isDetail">
            <ArticleDetail ref="articleRef"></ArticleDetail>
            <button @click="goBack">返回</button>
        </div>

    </el-drawer>
</template>
  
<script lang="ts" setup>
import axios from 'axios';
import { computed, inject, ref, toRefs, watch } from 'vue'
import SinglePost from './SinglePost.vue';
import ArticleDetail from '@/components/article/ArticleDetail.vue';
import { useStore } from 'vuex'

const store = useStore()
const objName = computed(() => {
    return store.getters['scene/getObjName'];
})

const posts = computed(() => {
    return store.getters['article/getPosts'];
})

const drawer = ref(false);
const disabled = computed(() => {
    return isDetail.value
});
// 文章概览默认取的条数
const DEFAULT_PAGE_SIZE = 10;
var pageSize = DEFAULT_PAGE_SIZE;
// console.log('name in ScrollList:' + name.value);
const isDetail = ref(false);
const articleRef = ref();

// 文章概览点击事件 -> 详细文章
const clickEven = (val: { content: string }) => {
    isDetail.value = true;
    try {
        articleRef.value.fetchArticle(val);
        articleRef.value.fetchComments(val);
    } catch (e) {
        console.log(e);
    }
};

// 返回文章概览
const goBack = () => {
    isDetail.value = false;
    // 清空comments (设为空字符串)
    store.dispatch('article/updateComments', '');
}

// 取文章概览数据
const load = async () => {
    try {
        let data: any;
        await axios({
            method: 'post',
            url: '/areaarticle',
            data: {
                areaId: objName.value,
                page: 1,
                pagesize: pageSize
            }
        }).then(function (response) {
            if (response.data.data != null) {
                console.log('response.data.data: ' + response.data.data);
                data = response.data.data;
                console.log('data: ' + data);
            } else {
                // posts.value = [];
                data = [];
            }
        });

        if (pageSize <= data.length) {  // 如果没有取完所有数据，pageSize+=2
            pageSize += 2;
        }


        console.log('pageSize: ' + pageSize);
        // 更新posts
        // posts.value = data;
        store.dispatch('article/updatePosts', data);

    } catch (error) {
        console.log(error);
    }
};

// 暴露load方法
defineExpose({ load });

// 监听objName，发生变化时执行load，装载文章概览
watch(
    () => objName.value,
    () => {
        // 加载条目数设为初值
        pageSize = DEFAULT_PAGE_SIZE;
        load();

        console.log('objName changed ' + objName.value);
    },
    // { immediate: true }  // watch默认懒执行，只有数据源变化时才回调
)

</script>
  
<style>
.main_container {
    height: 100%;
}

.infinite-list {
    width: auto;
    height: 95%;
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
  

