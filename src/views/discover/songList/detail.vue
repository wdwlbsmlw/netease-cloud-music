<template>
    <div class="page-wrapper-max songlist-detail">
        <div class="songlist-detail-header">
            <div class="songlist-detail-cover">
                <img :src="detail.data.coverImgUrl" alt="">
            </div>
            <div class="songlist-detail-title flex-center">
                <n-tag>歌单</n-tag>
                <p>{{ detail.data.name }}</p>
            </div>
            <div class="songlist-detail-author flex-center">
                <n-avatar :creator="creator"></n-avatar>
                <span>{{ $filters.datetime(detail.data.createTime, 'yyyy-MM-dd') }}创建</span>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, getCurrentInstance, reactive } from 'vue'
import { useGetDetailHooks } from '@/hooks'
import { GetPlayListDetail } from '@/api'

export default {
    name: 'DiscoverSongListDetail',

    setup() {
        const { ctx } = getCurrentInstance()
        let currentRoute = ctx.$router.currentRoute.value
        let params = reactive({ id: currentRoute.params.id })
        const {detail} = useGetDetailHooks('playlist', GetPlayListDetail, params)
        console.log(detail.data)

        let creator = computed(() => detail.data.creator || {})
        return {
            detail,
            creator
        }
    }
}
</script>