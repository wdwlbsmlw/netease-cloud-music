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
            <div class="songlist-detail-oper flex-center">
                <n-button type="primary" icon="icon-play">播放全部</n-button>
                <n-button icon="icon-subscribe">收藏({{ detail.data.subscribedCount }})</n-button>
                <n-button icon="icon-share">分享({{ detail.data.shareCount }})</n-button>
                <n-button icon="icon-download">下载全部</n-button>
            </div>
            <div class="songlist-detail-info">
                <p>
                    <label>标签：</label>
                    <template v-for="(item, index) in detail.data.tags" :key="item">
                        <i v-if="index > 0">/</i>
                        <router-link :to="{ name: 'DiscoverSongList', query: { tag: item } }">{{ item }}</router-link>
                    </template>
                </p>
                <p>
                    <label>歌曲：</label>
                    <span>{{ detail.data.trackCount }}</span>
                    <label>播放：</label>
                    <span>{{ detail.data.playCount }}</span>
                </p>
                <p class="desc" :class="{truncate: !descMore}">
                    <label>简介：</label>
                    <span>{{ detail.data.description }}</span>
                    <i :class="['arrow', 'iconfont', !descMore ? 'icon-arrow-surface-down' : 'icon-arrow-surface-up']" @click="descMore = !descMore"></i>
                </p>
            </div>
        </div>
        <div class="songlist-detail-cont">
            <n-tabs v-model="activeTab">
                <n-tabs-item label="歌曲列表" name="songlist">
                    歌曲列表
                </n-tabs-item>
                <n-tabs-item :label="`评论(${detail.data.commentCount || 0})`" name="comment">
                    评论
                </n-tabs-item>
                <n-tabs-item label="收藏者" name="collector">
                    收藏者
                </n-tabs-item>
            </n-tabs>
        </div>
    </div>
</template>

<script>
import { computed, getCurrentInstance, reactive, ref } from 'vue'
import { useGetDetailHooks } from '@/hooks'
import { GetPlayListDetail } from '@/api'

export default {
    name: 'DiscoverSongListDetail',

    setup() {
        const { ctx } = getCurrentInstance()
        let currentRoute = ctx.$router.currentRoute.value
        let params = reactive({ id: currentRoute.params.id })
        const {detail} = useGetDetailHooks('playlist', GetPlayListDetail, params)
        let creator = computed(() => detail.data.creator || {})
        let descMore = ref(false)
        let activeTab = ref('songlist')

        return {
            detail,
            creator,
            descMore,
            activeTab
        }
    }
}
</script>