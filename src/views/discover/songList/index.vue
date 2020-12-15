<template>
    <div class="page-wrapper">
        <n-list v-if="table.total > 0">
            <n-list-item v-for="item in table.playlists" :key="item.id">
                <n-box :cover="item.coverImgUrl" :name="item.name" :play-count="item.playCount" :author="item.creator"></n-box>
            </n-list-item>
        </n-list>
        <n-pager :total="table.total" :page="page" :page-size="pageSize"></n-pager>
        {{ page }}
    </div>
</template>

<script>
/**
 * 歌单（网友推荐）页面
 */
import { ref, reactive } from 'vue'
import { GetTopPlayList } from '@/api'

export default {
    name: 'DiscoverSongList',

    setup() {
        let page = ref(1)
        let pageSize = ref(15)
        let _params = {
            order: 'hot',
            cat: '全部',
            limit: pageSize.value,
            offset: (page.value - 1) * pageSize.value
        }
        let table = reactive({})
        GetTopPlayList(_params).then(data => {
            table.playlists = reactive(data.playlists)
            table.total = ref(data.total)
            table.more = ref(data.more)
        })
        
        return {
            page,
            pageSize,
            table
        }
    }
}
</script>