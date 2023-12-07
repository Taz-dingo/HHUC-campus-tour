import { createStore } from 'vuex'
import getters from './getters'
// import settings from './modules/settings'
import user from './modules/user'


const store = createStore({
  modules: {
    user
  },
  getters
})

export default store

