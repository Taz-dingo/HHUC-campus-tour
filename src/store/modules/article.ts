const article = {
    namespaced: true,

    state: () => ({
        posts: [],  // 文章概览
        articleId: '', // 文章id
        comments: [],    //文章评论
        replies: []    //评论回复

    }),
    // 理解为过滤器、计算属性
    getters: {
        getPosts(state) {
            return state.posts;
        },
        getComments(state) {
            return state.comments;
        },
        getReplies(state) {
            return state.replies;
        }
    },
    // 同步修改
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setComments(state: any, comments: any) {
            state.comments = comments;
        },
        setReplies(state, replies) {
            state.replies = replies;
        }
    },
    // 提交mutation，可以异步操作
    actions: {
        updatePosts({ commit }, posts) {
            commit('setPosts', posts);
        },
        updateComments({ commit }, comments) {
            commit('setComments', comments);
        },
        updateReplies({ commit }, replies) {
            commit('setReplies', replies);
        }
    }
}

export default article
