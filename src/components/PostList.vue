<template>
    <div class="post-list">
        <div v-for="post in posts" :key="posts.articleId">
            <router-view>
                <SinglePost :post="post"></SinglePost>
            </router-view>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { ref } from "vue";
import SinglePost from"./SinglePost.vue";
import axios from "axios";

const props = defineProps<{
    posts:Array<Object>
}>()

const posts = ref(Array);


</script>
