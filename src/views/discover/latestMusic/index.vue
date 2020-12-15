<template>
    <div class="page-wrapper">
        DiscoverLatestMusic
        <p v-for="item in 200" :key="item">{{ item }}</p>
    </div>
</template>

<script>
/**
 * 排行榜页面
 */
export default {
    name: 'DiscoverLatestMusic'
}
</script>