import { createStore } from 'vuex'
import getters from './getters'
// import settings from './modules/settings'
import user from './modules/user'
import scene from './modules/scene'
import article from './modules/article'

const store = createStore({
  modules: {
    user,
    scene: scene,
    article: article
  },
  // getters
})

export default store

