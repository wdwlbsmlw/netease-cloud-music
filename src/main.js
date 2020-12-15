import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
import filters from './utils/filters'
import nc from './plugins/nc'

const app = createApp(App)

// 注册全局过滤器
app.config.globalProperties.$filters = filters

// 注册全局组件
for (const key in nc) {
    app.component(key, nc[key])
}

app.use(store).use(router).mount('#app')