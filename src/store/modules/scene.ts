const scene = {
    namespaced: true,

    state: () => ({
        objName: '',
    }),
    // 理解为过滤器、计算属性
    getters: {
        getObjName(state: object) {
            return state.objName
        }
    },
    // 同步修改
    mutations: {
        setObjName(state: any, choosedOBJ: any) {
            state.objName = choosedOBJ;
        }
    },
    // 提交mutation，可以异步操作
    actions: {
        updateObjName({ commit }, newName) {
            commit('setObjName', newName);
        }
    }

}


export default scene
