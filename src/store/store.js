import { createStore } from 'vuex'


const store = createStore({
    state () {
        return {
            msg:"好好学习 天天向上",
        }
    },
    mutations: {
        changeMsg(state,info) {
            state.msg = msg;
        }
    }
})

export default store;
