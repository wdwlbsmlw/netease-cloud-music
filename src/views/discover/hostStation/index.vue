<template>
    <div class="page-wrapper">
        DiscoverHostStation
        <p v-for="item in 200" :key="item">{{ item }}</p>
    </div>
</template>

<script>
/**
 * 主播电台页面
 */
export default {
    name: 'DiscoverHostStation'
}
</script>