<template>
    <div :class="className">
        <slot></slot>
    </div>
</template>

<script>
import { computed } from 'vue'
export default {
    name: 'NList',

    props: {
        col: {
            type: Number,
            validator: val => [3, 5, 6].includes(val)
        }
    },

    setup(props) {
        let className = computed(() => `nc-list nc-list-col-${props.col}`)
        return {
            className
        }
    }
}
</script>