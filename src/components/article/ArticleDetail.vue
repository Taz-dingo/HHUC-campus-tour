<template>

    <div class="articleContainer">
        <h1>{{ article.title }}</h1>
        <p>{{ article.content }}</p>
        <h3>评论</h3>
        <div v-for="comment in comments" :key="comment.commentId" class="comment">
            <p>{{ comment.content }}</p>
        </div>
        <h3>发表评论</h3>
        <el-input type="textarea" placeholder="请输入评论内容" v-model="newCommentContent" class="comment-input">
        </el-input>
        <el-button type="primary" @click="submitComment">提交评论</el-button>
    </div>
</template>

   
<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
    props: ["id"],
    setup(props) {
        const article = ref({});
        const comments = ref([]);
        const newCommentContent = ref("");

        const fetchArticle = async () => {
            // const response = await axios.get(`/detailarticle/${props.id}`);
            const response = await axios({
                method: 'post',
                url: 'detailarticle',
                data: {
                    articleId: 1
                }
            });

            article.value = response.data.data;
        };

        const fetchComments = async () => {
            const response = await axios({
                method: 'post',
                url: 'showcomments',
                data: {
                    articlefatherId: 2,
                    page: 1,
                    pagesize: 20,
                    is_fresh: 1
                }
            });

            comments.value = response.data.data;
        };

        const submitComment = async () => {
            await axios.post("/api/comment", {
                content: newCommentContent.value,
                articleId: props.id
            });
            newCommentContent.value = "";
            await fetchComments();
        };

        onMounted(async () => {
            await fetchArticle();
            await fetchComments();
        });

        return { article, comments, newCommentContent, submitComment };
    },
};
</script>
   
<style scoped>
.comment {
    border-bottom: 1px solid #eee;
    padding: 10px 0;
}

.comment-input {
    margin-bottom: 20px;
}
.articleContainer{
    width: 19%;
    border:1px solid #ccc!important;
    border-radius: 20px;
    padding: 20px;
}
</style>