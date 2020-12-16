<template>
    <div class="nc-loading">
        <i class="iconfont icon-loading"></i>
        <span>{{ text }}</span>
    </div>
</template>

<script>
export default {
    name: 'NLoading',

    props: {
        text: {
            type: String,
            default: '载入中...'
        }
    }
}
</script>