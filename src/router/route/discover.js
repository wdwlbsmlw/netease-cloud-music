export default [
    {
        path: '/discover',
        name: 'Discover',
        redirect: '/discover/recommend',
        component: () => import('@/views/discover/index.vue'),
        children: [
            {
                path: 'recommend',
                name: 'DiscoverRecommend',
                component: () => import('@/views/discover/recommend')
            },
            {
                path: 'songList',
                name: 'DiscoverSongList',
                component: () => import('@/views/discover/songList')
            },
            {
                path: 'hostStation',
                name: 'DiscoverHostStation',
                component: () => import('@/views/discover/hostStation')
            },
            {
                path: 'rankingList',
                name: 'DiscoverRankingList',
                component: () => import('@/views/discover/rankingList')
            },
            {
                path: 'singer',
                name: 'DiscoverSinger',
                component: () => import('@/views/discover/singer')
            },
            {
                path: 'latestMusic',
                name: 'DiscoverLatestMusic',
                component: () => import('@/views/discover/latestMusic')
            }
        ]
    }
]