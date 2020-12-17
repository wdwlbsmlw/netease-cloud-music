<template>
    <button class="nc-button" :class="buttonClasses" :disabled="disabled">
        <i v-if="icon" :class="`iconfont ${icon}`"></i>
        <span v-if="$slots.default">
            <slot></slot>
        </span>
        <i v-if="hasArrow" class="iconfont icon-arrow-right arrow"></i>
    </button>
</template>

<script>
import { computed } from 'vue'
export default {
    name: 'NButton',

    props: {
        icon: String,
        hasArrow: Boolean,
        round: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        plain: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'default',
            validator: val => ['default', 'primary'].includes(val)
        },
        size: {
            type: String,
            default: 'default',
            validator: val => ['small', 'default', 'large'].includes(val)
        }
    },

    setup(props) {
        let buttonClasses = computed(() => {
            return {
                'is-round': props.round,
                'is-plain': props.plain,
                [`nc-button-${props.type}`]: true,
                [`nc-button-size-${props.size}`]: true
            }
        })
        return {
            buttonClasses
        }
    }
}
</script>