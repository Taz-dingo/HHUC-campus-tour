<template>
    <div class="articleContainer">
        <div class="article">

            <div>
                <h1>{{ article.title }}</h1>
                <p class="articleText">{{ article.content }}</p>
            </div>

            <el-descriptions>
                <div clas="footer">
                    <el-descriptions-item label="">kooriookami</el-descriptions-item>
                    <el-descriptions-item label="">
                        <el-tag size="small">School</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="">1900-01-01 </el-descriptions-item>
                </div>
            </el-descriptions>

        </div>
        <div class="commentArea">
            <h3>评论</h3>
            <div v-infinite-scroll="fetchComments" infinite-scroll-distance="10" infinite-scroll-delay="200"
                class="infinite-list" style="overflow: auto">
                <el-scrollbar>
                    <div class="comment" v-for="comment in articleComments" :key="comment.commentId">
                        <p class="commentText">{{ comment.content }}</p>
                        <button class="replyButton" @click="clickReply">回复</button>
                        <div class="reply" v-for="reply in comment.reply" :key="reply.commentId">
                            <p class="replyText">{{ reply.content }}</p>
                        </div>
                    </div>
                </el-scrollbar>
            </div>

            <h3>发表评论</h3>
            <el-input class="commentInput" type="textarea" placeholder="请输入评论内容" v-model="newCommentContent">
            </el-input>
            <el-button type="primary" @click="submitComment">提交评论</el-button>
        </div>

    </div>
</template>

   
<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { getDetailArticle } from "@/api/article"
import { getArticleComment } from "@/api/article"

const id = ref();
const article = ref({});
const comments = ref([]);

// 文章评论
const articleComments = ref([]);
const commenstReply = ref([]);
const newCommentContent = ref("");

// const fetchArticle = async (id) => {
//     const response = await axios({
//         method: 'post',
//         url: 'detailarticle',
//         data: {
//             articleId: id
//         }
//     });

//     article.value = response.data.data;
// };

const fetchArticle = (id: any) => {
    getDetailArticle({
        articleId: id
    }).then((response) => {
        article.value = response.data.data;
    });
}

const fetchComments = (id: any) => {
    getArticleComment({
        articlefatherId: id,
        page: 1,
        pagesize: 20,
        is_fresh: 1
    }).then((response) => {
        if (response.data.data != null) {
            articleComments.value = response.data.data.filter((comment: { is_parent_article: number; }) => comment.is_parent_article === 1);
            // console.log(articleComments.value);
            commenstReply.value = response.data.data.filter((comment: { is_parent_article: number; }) => comment.is_parent_article === 0);
            // console.log(commenstReply.value);

            for (var i = 0; i < articleComments.value.length; i++) {
                for (var j = 0; j < commenstReply.value.length; j++) {
                    // 如果文章评论的commentId === 评论回复的commentfatherId
                    // 就把这条commentReply设为articleComments的reply属性
                    if (articleComments.value[i].commentId === commenstReply.value[j].commentfatherId) {
                        articleComments.value[i].reply = [];
                        articleComments.value[i].reply.push(commenstReply.value[j]);
                    }
                }
            }

            console.log('testestestest');
        } else {
            articleComments.value = [];
            commenstReply.value = [];

        }
    });
}

// const fetchComments = async (id: undefined) => {
//     try {
//         await axios({
//             method: 'post',
//             url: 'showcomments',
//             data: {
//                 articlefatherId: id,
//                 page: 1,
//                 pagesize: 20,
//                 is_fresh: 1
//             }
//         }).then(function (response) {

//             // articleComments.value = [];
//             // commenstReply.value = [];
//             if (response.data.data != null) {

//                 articleComments.value = response.data.data.filter((comment: { is_parent_article: number; }) => comment.is_parent_article === 1);
//                 // console.log(articleComments.value);
//                 commenstReply.value = response.data.data.filter((comment: { is_parent_article: number; }) => comment.is_parent_article === 0);
//                 // console.log(commenstReply.value);
//                 // console.log('response.data.data is not null');
//             } else {
//                 // console.log('response.data.data is null');
//             }
//         });

//         for (var i = 0; i < articleComments.value.length; i++) {
//             for (var j = 0; j < commenstReply.value.length; j++) {
//                 // 如果文章评论的commentId === 评论回复的commentfatherId
//                 // 就把这条commentReply设为articleComments的reply属性
//                 if (articleComments.value[i].commentId === commenstReply.value[j].commentfatherId) {
//                     articleComments.value[i].reply = [];
//                     articleComments.value[i].reply.push(commenstReply.value[j]);
//                 }
//             }
//         }
//         console.log('testestestest');

//     } catch (e) {
//         console.log(e);
//     }
// };


const submitComment = async () => {
    await axios.post("/api/comment", {
        content: newCommentContent.value,
        articleId: props.id
    });
    newCommentContent.value = "";
    await fetchComments();
};

const clickReply = () => {
    alert('clicked');
};


defineExpose({ fetchArticle, fetchComments });

</script>
   
<style scoped>
.comment {
    border-bottom: 1px solid #eee;
    padding: 10px 0;
}

.comment-input {
    margin-bottom: 20px;
}

.replyButton {
    color: #79bbff;
    font-weight: bold;
    background-color: transparent;
    border: none;
}

.reply {
    text-indent: 2em;
}


.articleContainer {
    /* width: 19%; */
    border: 1px solid #ccc !important;
    border-radius: 20px;
    padding: 20px;
}

.articleText {
    text-indent: 2em;
}

.article {
    word-wrap: break-word;
}
</style>