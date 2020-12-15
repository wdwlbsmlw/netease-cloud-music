import { createRouter, createWebHistory } from 'vue-router'
import discover from './route/discover'
import video from './route/video'

const routes = [
    ...discover,
    ...video,
    {
        path: '',
        redirect: '/discover'
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
