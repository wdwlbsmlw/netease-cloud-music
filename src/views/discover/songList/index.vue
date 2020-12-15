<template>
    <div>
        this is song list page.
        <!-- <p>{{ table.code }}</p> -->
        <p>{{ table }}</p>
    </div>
</template>

<script>
/**
 * 歌单（网友推荐）页面
 */
import { reactive } from 'vue'
// import { GetTopPlayList } from '@/api'

export default {
    name: 'DiscoverSongList',

    setup() {
        let table = reactive({})
        // GetTopPlayList().then(data => {
        //     table.total = reactive(data.total)
        //     table.more = reactive(data.more)
        //     table.code = reactive(data.code)
        //     table.playlists = reactive(data.playlists)
        // })
        return {
            table
        }
    }
}
</script>