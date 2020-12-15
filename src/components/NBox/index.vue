<template>
    <div class="nc-box">
        <div class="nc-box-image" :style="imageStyles">
            <span class="nc-box-playcount">{{ playCount }}</span>
            <span class="nc-box-author">{{ author.nickname }} <img v-if="author.avatarDetail" :src="author.avatarDetail.identityIconUrl"></span>
            <span class="nc-box-play">
                <i class="iconfont icon-play"></i>
            </span>
        </div>
        <p>{{ name }}</p>
    </div>
</template>

<script>
import { computed } from 'vue'
export default {
    name: 'NBox',

    props: {
        // 封面
        cover: {
            type: String,
            default: ''
        },
        // 标题
        name: String,
        // 播放量
        playCount: Number,
        // 作者
        author: {
            type: Object,
            default: () => ({})
        }
    },

    setup(props) {
        let imageStyles = computed(() => {
            return {
                'background-image': `url(${props.cover})`
            }
        })
        return {
            imageStyles
        }
    }
}
</script>