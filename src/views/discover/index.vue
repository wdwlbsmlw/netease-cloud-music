<template>
    <div class="page">
        <div class="page-nav">
            <router-link to="/discover/recommend">个性推荐</router-link>
            <router-link to="/discover/songList">歌单</router-link>
            <router-link to="/discover/hostStation">主播电台</router-link>
            <router-link to="/discover/rankingList">排行榜</router-link>
            <router-link to="/discover/singer">歌手</router-link>
            <router-link to="/discover/latestMusic">最新音乐</router-link>
        </div>
        <div class="page-cont">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Discover'
}
</script>