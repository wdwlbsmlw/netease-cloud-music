<template>
    <div class="nc-pager">
        <ul>
            <li class="arrow" @click="onPrev">&lt;</li>
            <li class="">1</li>
            <li class="active">2</li>
            <li>{{ maxPage }}</li>
            <li class="arrow" @click="onNext">&gt;</li>
        </ul>
    </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
export default {
    name: 'NPager',

    props: {
        total: {
            type: Number,
            default: 0
        },
        page: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number,
            default: 10
        }
    },

    setup(props, context) {
        let maxPage = computed(() => Math.ceil(props.total / props.pageSize))

        let currentPage = ref(props.page)
        watchEffect(() => {
            console.log('change current page', currentPage.value)
            context.emit('update:page', currentPage.value)
        })

        const onPrev = () => {
            if (currentPage.value === 1) return
            currentPage.value--
        }
        const onNext = () => {
            if (currentPage.value === maxPage.value) return
            currentPage.value++
        }
        return {
            maxPage,
            onPrev,
            onNext
        }
    }
}
</script>