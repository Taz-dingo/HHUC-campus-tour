<template>
    <div class="article-container">
        <div class="article">

            <div class="article_container">
                <!-- <div class="info_container">
                    <el-avatar :size=50 />
                    <p>{{ article.creatorName }}</p>
                </div> -->
                <div>
                    <h1>{{ article.title }}</h1>
                    <p class="article-text">{{ article.content }}</p>
                </div>
            </div>

            <el-descriptions column="3">
                <div>
                    <el-descriptions-item>
                        <div
                            style="display: grid;grid-template-columns: 1fr 1fr;align-items: center;justify-content: center;">
                            <el-avatar :size="avatarSizes[0]" />
                            {{ article.creatorName }}
                        </div>
                    </el-descriptions-item>
                    <el-descriptions-item label="">
                        <el-tag size="small">
                            {{ article.tagOne }}
                        </el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="">
                        {{ article.createTime }}
                    </el-descriptions-item>
                </div>
            </el-descriptions>
        </div>

        <div class="comment_area">
            <h3>评论</h3>
            <div v-infinite-scroll="fetchComments" infinite-scroll-distance="10" infinite-scroll-delay="200"
                class="infinite-list" style="overflow: auto">
                <el-scrollbar>
                    <div class="comments" v-for="comment in comments" :key="comment.commentId">
                        <div class="comment_container">
                            <el-avatar :size="avatarSizes[1]" />
                            <div>
                                <p class="comment_user_name" style="align-content: start;justify-content: start;">
                                    {{ comment.creatorName }}
                                </p>
                                <p class="comment_text" style="align-content: start;justify-content: start;">
                                    {{ comment.content }}
                                </p>
                            </div>
                        </div>
                        <button class="reply_button" @click="clickReply">
                            回复
                        </button>

                        <div class="reply_container" v-for="reply in comment.reply" :key="reply.commentId">
                            <el-avatar :size="avatarSizes[2]" />
                            <div>
                                <p class="reply_user_name">{{ reply.creatorName }}</p>
                                <p class="reply_text">{{ reply.content }}</p>
                            </div>
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
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { getDetailArticle } from "@/api/article"
import { getArticleComment } from "@/api/article"
import { useStore } from 'vuex'

const avatarSizes: Array<number> = [50, 40, 35];  // 分别是文章、回复、评论里的头像size


const store = useStore();
const comments = computed(() => {
    return store.getters['article/getComments']
})

const article = computed(() => {
    return store.getters['article/getArticle'];
})

// 文章评论
const articleComments = ref([]);
const commentsReply = ref([]);
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

const fetchArticle = async (id: any) => {
    await getDetailArticle({
        articleId: id
    }).then((response) => {
        store.dispatch('article/updateArticle', response.data.data);
    });
}

const fetchComments = async (id: any) => {
    await getArticleComment({
        articlefatherId: id,
        page: 1,
        pagesize: 20,
        is_fresh: 1
    }).then((response) => {
        // 如果查询到的comments非空（有comments）
        if (response.data.data != null) {
            articleComments.value = response.data.data.filter((comment: { is_parent_article: number; }) => comment.is_parent_article === 1);
            // console.log(articleComments.value);
            commentsReply.value = response.data.data.filter((comment: { is_parent_article: number; }) => comment.is_parent_article === 0);
            // console.log(commentsReply.value);

            console.log('comments.length: ' + articleComments.value.length);
            console.log('replies.length: ' + commentsReply.value.length);
            // if(commentsReply.value.length !=)

            for (var i = 0; i < articleComments.value.length; i++) {
                for (var j = 0; j < commentsReply.value.length; j++) {
                    // 如果文章评论的commentId === 评论回复的commentfatherId
                    // 就把这条commentReply设为articleComments的reply属性
                    if (articleComments.value[i].commentId === commentsReply.value[j].commentfatherId) {
                        articleComments.value[i].reply = [];
                        articleComments.value[i].reply.push(commentsReply.value[j]);
                    }
                }
            }

            store.dispatch('article/updateComments', articleComments)

        } else {
            articleComments.value = [];
            commentsReply.value = [];

        }
    });
}


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
   
<style >
.comment_container {
    display: grid;
    grid-template-columns: 50px auto;
    align-items: center;
    word-wrap: break-word;
}

.comments {
    border-bottom: 1px solid #eee;
    padding: 10px 0;
}

.comment-input {
    margin-bottom: 20px;
}

.reply_button {
    color: #79bbff;
    font-weight: bold;
    background-color: transparent;
    border: none;
}

.reply_container {
    display: grid;
    grid-template-columns: 45px auto;
    align-items: center;
    word-wrap: break-word;

    /* 缩进 */
    margin-left: 30px;
}

.article-container {
    /* width: 19%; */
    border: 1px solid #ccc !important;
    border-radius: 20px;
    padding: 20px;
}

.article-text {
    text-indent: 2em;
}

.article {
    word-wrap: break-word;
}
</style>