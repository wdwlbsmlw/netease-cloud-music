<template>
    <div class="nc-menu">
        <div class="nc-menu-channel">
            <router-link exact to="/discover">发现音乐</router-link>
            <router-link exact to="/video">视频</router-link>
            <!-- <router-link exact to="/discover/songList">朋友</router-link>
            <router-link exact to="/discover/songList">直播</router-link>
            <router-link exact to="/discover/songList">私人FM</router-link> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'Menu'
}
</script>