<template>
    <div class="nc-box">
        <div class="nc-box-image" :class="{ 'is-square': isSquare, 'has-link': hasLink }" :style="imageStyles" @click="onLinkHandle">
            <img v-if="!isSquare" :src="cover">
            <span class="nc-box-playcount"><i class="iconfont icon-play-line"></i> {{ playCountLabel }}</span>
            <span class="nc-box-author"><i class="iconfont icon-account"></i> {{ author.nickname }} <img v-if="author.avatarDetail" :src="author.avatarDetail.identityIconUrl"></span>
            <span class="nc-box-play">
                <i class="iconfont icon-play"></i>
            </span>
        </div>
        <p>{{ name }}</p>
    </div>
</template>

<script>
import { computed, getCurrentInstance } from 'vue'
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
        playCount: {
            type: Number,
            default: 0
        },
        // 作者
        author: {
            type: Object,
            default: () => ({})
        },
        // 封面是否为正方形
        isSquare: {
            type: Boolean,
            default: true
        },
        link: {
            type: [Object, String],
            default: () => ({})
        }
    },

    setup(props) {
        const {ctx} = getCurrentInstance()

        let imageStyles = computed(() => {
            return {
                'background-image': `url(${props.cover})`
            }
        })
        let playCountLabel = computed(() => {
            return ctx.$filters.numConvert(props.playCount)
        })

        const hasLink = computed(() => typeof props.link === 'object' ? Object.keys(props.link).length > 0 : props.link !== '')
        const onLinkHandle = () => ctx.$router.push(props.link)

        return {
            imageStyles,
            playCountLabel,
            hasLink,
            onLinkHandle
        }
    }
}
</script>