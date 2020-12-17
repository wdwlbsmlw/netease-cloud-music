<template>
    <div class="nc-avatar flex-center">
        <div class="nc-avatar-img flex-center2">
            <img v-if="creator.avatarUrl" :src="creator.avatarUrl" alt="头像" :title="creator.nickname">
            <i v-else class="iconfont icon-account"></i>
            <img v-if="levelIconUrl" :src="levelIconUrl" alt="" class="level">
        </div>
        <router-link to="/">{{ creator.nickname }}</router-link>
    </div>
</template>

<script>
import { computed } from 'vue'
export default {
    name: 'NAvatar',

    props: {
        creator: {
            type: Object,
            require: true,
            default: () => {}
        }
    },

    setup(props) {
        const levelIconUrl = computed(() => props.creator?.avatarDetail?.identityIconUrl || '')
        return {
            levelIconUrl
        }
    }
}
</script>