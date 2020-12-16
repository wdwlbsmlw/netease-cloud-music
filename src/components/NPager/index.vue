<template>
    <div class="nc-pager">
        <ul>
            <li class="arrow" :class="{disabled: currentPage === 1}" @click="onPrev">&lt;</li>
            <li :class="{ active: currentPage === 1 }" @click="onHandle(1)">1</li>
            <li v-if="showPrevMore" class="more">...</li>
            <li v-for="pager in pagers" :key="pager" :class="{ active: currentPage === pager }" @click="onHandle(pager)">{{ pager }}</li>
            <li v-if="showNextMore" class="more">...</li>
            <li :class="{ active: currentPage === pageCount }" v-if="pageCount > 1" @click="onHandle(pageCount)">{{ pageCount }}</li>
            <li class="arrow" :class="{disabled: currentPage === pageCount}" @click="onNext">&gt;</li>
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
        return {
            currentPage,
            pageCount,
            pagers,
            showPrevMore,
            showNextMore,

            onHandle,
            onPrev,
            onNext,
        }
    },
}
</script>
