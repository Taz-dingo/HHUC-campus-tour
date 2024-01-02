const user = {
    namespaced: true,

    state: () => ({
        login:false,    // 是否登录
        userInfo:"13141",  // 用户信息
        userToken:'',   // 用户登录token
    }),
    
    getters:{
        getLogin(state){
            return state.login;
        },
        getUserInfo(state){
            return state.userInfo;
        },
        getUserToken(state){
            return state.userToken;
        }
    },

    mutations:{
        setLogin(state,login){
            state.login = login;
        },
        setUserInfo(state,userInfo){
            state.userInfo = userInfo;
        },
        setUserToken(state,userToken){
            state.userToken = userToken;
        }
    },

    actions:{
        updateLogin({commit},login){
            commit('setLogin', login);
        },
        updateUserInfo({commit},userInfo){
            commit('setUserInfo',userInfo);
        },
        updateUserToken({commit},userToken){
            commit('setUserToken',userToken);
        },
    }
}

export default user;