import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
import filters from './utils/filters'

const app = createApp(App)

// 注册全局过滤器
app.config.globalProperties.$filters = filters

app.use(store).use(router).mount('#app')