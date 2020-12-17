<template>
    <div class="nc-pager">
        <ul>
            <li class="arrow" :class="{disabled: currentPage === 1}" @click="onPrev">
                <i class="iconfont icon-arrow-left"></i>
            </li>
            <li :class="{ active: currentPage === 1 }" @click="onHandle(1)">1</li>
            <li v-if="showPrevMore" class="more" @click="onMoreHandle('prev')" @mouseenter="onMoreEnter('left')" @mouseleave="onMoreLeave('left')">
                <i :class="`iconfont ${quickPrevIconClass}`"></i>
            </li>
            <li v-for="pager in pagers" :key="pager" :class="{ active: currentPage === pager }" @click="onHandle(pager)">{{ pager }}</li>
            <li v-if="showNextMore" class="more" @click="onMoreHandle('next')" @mouseenter="onMoreEnter('right')" @mouseleave="onMoreLeave('right')">
                <i :class="`iconfont ${quickNextIconClass}`"></i>
            </li>
            <li :class="{ active: currentPage === pageCount }" v-if="pageCount > 1" @click="onHandle(pageCount)">{{ pageCount }}</li>
            <li class="arrow" :class="{disabled: currentPage === pageCount}" @click="onNext">
                <i class="iconfont icon-arrow-right"></i>
            </li>
        </ul>
    </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
export default {
    name: 'NPager',

    props: {
        total: {
            type: Number,
            default: 0,
        },
        page: {
            type: Number,
            default: 1,
        },
        pageSize: {
            type: Number,
            default: 50,
        },
        pagerCount: {
            type: Number,
            default: 9
        }
    },

    setup(props, context) {
        // page count
        let pageCount = computed(() => Math.ceil(props.total / props.pageSize))

        // currentPage
        let currentPage = ref(props.page)
        watch(currentPage, val => {
            context.emit('update:page', val)
            context.emit('change', val)
        })

        // pager list
        let showPrevMore = ref(false)
        let showNextMore = ref(false)
        let pagers = computed(() => {
            const pagerCount = props.pagerCount
            const halfPagerCount = (pagerCount - 1) / 2
            showPrevMore.value = false
            showNextMore.value = false
            if (pageCount.value > pagerCount) {
                if (currentPage.value > pagerCount - halfPagerCount) {
                    showPrevMore.value = true
                }
                if (currentPage.value < pageCount.value - halfPagerCount) {
                    showNextMore.value = true
                }
            }
            const array = []
            if (showPrevMore.value && !showNextMore.value) {
                const startPage = pageCount.value - (pagerCount - 2)
                for (let i = startPage; i < pageCount.value; i++) {
                    array.push(i)
                }
            } else if (!showPrevMore.value && showNextMore.value) {
                for (let i = 2; i < pagerCount; i++) {
                    array.push(i)
                }
            } else if (showPrevMore.value && showNextMore.value) {
                const offset = Math.floor(pagerCount / 2) - 1
                for (let i = currentPage.value - offset; i <= currentPage.value + offset; i++) {
                    array.push(i)
                }
            } else {
                for (let i = 2; i < pageCount.value; i++) {
                    array.push(i)
                }
            }
            return array
        })

        // pager more
        let quickPrevIconClass = ref('icon-more')
        let quickNextIconClass = ref('icon-more')
        const onMoreEnter = type => type === 'left' ? quickPrevIconClass.value = `icon-arrow-double-${type}` : quickNextIconClass.value = `icon-arrow-double-${type}`
        const onMoreLeave = type => type === 'left' ? quickPrevIconClass.value = `icon-more` : quickNextIconClass.value = `icon-more`

        // methods
        const onHandle = val => {
            currentPage.value = val
        }
        const onPrev = () => {
            if (currentPage.value === 1) return
            currentPage.value--
        }
        const onNext = () => {
            if (currentPage.value === pageCount.value) return
            currentPage.value++
        }
        const onMoreHandle = type => {
            if (type === 'prev') {
                currentPage.value -= props.pagerCount - 2
                onMoreLeave('left')
            }
            else if (type === 'next') {
                currentPage.value += props.pagerCount - 2
                onMoreLeave('right')
            }
        }
        return {
            currentPage,
            pageCount,
            pagers,
            showPrevMore,
            showNextMore,
            quickPrevIconClass,
            quickNextIconClass,
            onMoreEnter,
            onMoreLeave,
            onHandle,
            onPrev,
            onNext,
            onMoreHandle
        }
    },
}
</script>
