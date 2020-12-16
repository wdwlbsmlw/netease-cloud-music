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
            type: [Number, String],
            default: 5,
            validator: val => [3, 4, 5, 6].includes(Number(val))
        }
    },

    setup(props) {
        let className = computed(() => `nc-list col-${props.col}`)
        return {
            className
        }
    }
}
</script>