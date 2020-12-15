export default [
    {
        path: '/video',
        name: 'Video',
        redirect: '/video/video',
        component: () => import('@/views/video/index.vue'),
        children: [
            {
                path: 'video',
                name: 'VideoVideo',
                component: () => import('@/views/video/video')
            },
            {
                path: 'mv',
                name: 'VideoMV',
                component: () => import('@/views/video/mv')
            }
        ]
    }
]