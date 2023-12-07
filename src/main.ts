// import './assets/main.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Element from "element-plus";
import 'element-plus/dist/index.css'
import axios from 'axios'
import store from './store'

// import './mock'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

axios.defaults.baseURL = 'http://localhost:8888'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


app.use(router);
app.use(Element);
app.use(store);

// 配置vue启用axios
app.config.globalProperties.$axios = axios;


app.mount('#app');
