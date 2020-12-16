<template>
    <div class="page-wrapper">
        <div class="page-wrapper-header">
            <n-popover v-model="visible" width="750px">
                <template v-slot:reference>
                    <n-button has-arrow round>{{ params.cat }}</n-button>
                </template>
                <n-catlist v-model="params.cat" @change="onCatlistChange"></n-catlist>
            </n-popover>
        </div>
        <n-loading v-if="loading"></n-loading>
        <n-list v-if="table.total > 0" v-show="!loading">
            <n-list-item v-for="item in table.playlists" :key="item.id">
                <n-box :cover="item.coverImgUrl" :name="item.name" :play-count="item.playCount" :author="item.creator"></n-box>
            </n-list-item>
        </n-list>
        <n-pager v-show="!loading" :total="table.total" v-model:page="params.page" :page-size="params.pageSize" @change="onPageChange"></n-pager>
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
        let visible = ref(false)
        let loading = ref(false)
        let params = reactive({ order: 'hot', page: 1, pageSize: 50, cat: '全部'})
        
        let table = reactive({})
        // 获取数据
        const getList = () => {
            loading.value = true
            clearData()
            const _params = {
                order: params.order,
                cat: params.cat,
                limit: params.pageSize,
                offset: (params.page - 1) * params.pageSize
            }
            GetTopPlayList(_params).then(data => {
                table.playlists = reactive(data.playlists)
                table.total = ref(data.total)
                loading.value = false
            }).catch(() => {
                loading.value = false
            })
        }

        // 清空数据
        const clearData = () => {
            table.playlists = reactive([])
            table.total = ref(0)
        }
        // 分页回调
        const onPageChange = () => {
            getList()
        }

        // 选择分类回调
        const onCatlistChange = () => {
            params.page = 1
            visible.value = false
            getList()
        }

        getList()
        
        return {
            params,
            visible,
            loading,
            table,
            onPageChange,
            onCatlistChange
        }
    }
}
</script>