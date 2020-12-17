<template>
    <div class="page-wrapper">
        <div class="page-wrapper-header">
            <n-popover v-model="visible" width="750px">
                <template v-slot:reference>
                    <n-button has-arrow round>{{ params.cat }}</n-button>
                </template>
                <n-catlist v-model="params.cat" v-model:hot="hotTop" @change="visibleHandle(false)"></n-catlist>
            </n-popover>
            <n-fastlist v-model="params.cat" :list="hotTop"></n-fastlist>
        </div>
        <n-loading v-if="tables.loading"></n-loading>
        <n-list v-if="tables.total > 0" v-show="!tables.loading">
            <n-list-item v-for="item in tables.list" :key="item.id">
                <n-box :cover="item.coverImgUrl" :name="item.name" :play-count="item.playCount" :author="item.creator" :link="{name: 'DiscoverSongListDetail', params: { id: item.id }}"></n-box>
            </n-list-item>
        </n-list>
        <n-pager v-show="!tables.loading" :total="tables.total" v-model:page="tables.page" :page-size="tables.pageSize" @change="getList"></n-pager>
    </div>
</template>

<script>
/**
 * 歌单（网友推荐）页面
 */
import { ref, reactive, getCurrentInstance } from 'vue'
import { GetTopPlayList } from '@/api'
import {useGetDataHooks} from '@/hooks/index'

export default {
    name: 'DiscoverSongList',

    setup() {
        const {ctx} = getCurrentInstance()
        const route = ctx.$router.currentRoute.value

        // 热门列表
        let hotTop = reactive([])
        
        // popover
        let visible = ref(false)
        const visibleHandle = (val = false) => visible.value = val

        // list params
        let params = reactive({ order: 'hot', cat: route.query?.tag || '全部' })

        // list hook
        let { tables, getList } = useGetDataHooks('playlists', GetTopPlayList, params)
        
        return {
            visible,
            params,
            tables,
            getList,
            visibleHandle,
            hotTop
        }
    }
}
</script>