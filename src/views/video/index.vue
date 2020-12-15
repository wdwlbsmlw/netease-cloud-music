<template>
    <div class="page">
        <div class="page-nav">
            <router-link to="/video/video">视频</router-link>
            <router-link to="/video/mv">MV</router-link>
        </div>
        <div class="page-cont">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Video'
}
</script>