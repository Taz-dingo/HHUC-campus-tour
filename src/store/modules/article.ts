const article = {
    namespaced: true,

    state: () => ({
        posts: [],  // 文章概览列表
        articleId: '', // 文章id
        article: {}, // 文章对象
        comments: [],    // 文章评论集
        replies: []    // 评论回复集（暂时没有用到，为了方便展示塞到comments里了）

    }),
    // 理解为过滤器、计算属性
    getters: {
        getArticleId(state) {
            return state.articleId;
        },
        getPosts(state) {
            return state.posts;
        },
        getComments(state) {
            return state.comments;
        },
        getReplies(state) {
            return state.replies;
        },
        getArticle(state) {
            return state.article;
        }
    },
    // 同步修改
    mutations: {
        setArticleId(state, articleId) {
            state.articleId = articleId;
        },
        setPosts(state, posts) {
            state.posts = posts;
        },
        setComments(state: any, comments: any) {
            state.comments = comments;
        },
        setReplies(state, replies) {
            state.replies = replies;
        },
        setArticle(state, article) {
            state.article = article;
        }
    },
    // 提交mutation，可以异步操作
    actions: {
        updateArticleId({ commit }, articleId) {
            commit('setArticleId', articleId)
        },
        updatePosts({ commit }, posts) {
            commit('setPosts', posts);
        },
        updateComments({ commit }, comments) {
            commit('setComments', comments);
        },
        updateReplies({ commit }, replies) {
            commit('setReplies', replies);
        },
        updateArticle({ commit }, article) {
            commit('setArticle', article);
        }
    }
}

export default article
                               