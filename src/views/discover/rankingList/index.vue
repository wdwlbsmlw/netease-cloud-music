<template>
    <div class="page-wrapper">
        DiscoverRankingList
        <p v-for="item in 200" :key="item">{{ item }}</p>
    </div>
</template>

<script>
/**
 * 排行榜页面
 */
export default {
    name: 'DiscoverRankingList'
}
</script>