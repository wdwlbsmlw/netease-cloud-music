<template>
    <div class="page-wrapper">
        DiscoverSinger
        <p v-for="item in 200" :key="item">{{ item }}</p>
    </div>
</template>

<script>
/**
 * 歌手页面
 */
export default {
    name: 'DiscoverSinger'
}
</script>