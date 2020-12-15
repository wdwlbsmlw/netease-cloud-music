<template>
    <div class="page-wrapper">
        <p v-for="item in 200" :key="item">{{ item }}</p>
    </div>
</template>

<script>
/**
 * 个性推荐页面
 */
export default {
    name: 'DiscoverRecommend'
}
</script>