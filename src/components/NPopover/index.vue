<template>
    <div class="nc-popover" v-clickoutside="onClose">
        <span @click="onToggle">
            <slot name="reference"></slot>
        </span>
        <div class="nc-popover-cont" :class="`placement-${placement}`" :style="popoverContStyle" v-show="visible">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
export default {
    name: 'NPopover',

    props: {
        modelValue: {
            type: Boolean,
            default: false
        },
        trigger: {
            type: String,
            default: 'click',
            validator: val => ['click', 'hover', 'custom'].includes(val)
        },
        disabled: {
            type: Boolean,
            default: false
        },
        width: {
            type: [Number, String],
            default: 700
        },
        placement: {
            type: String,
            default: 'bl',
            validator: val => ['b', 'bl', 'br', 't', 'tl', 'tr'].includes(val)
        }
    },

    setup(props, context) {
        let visible = ref(props.modelValue)
        const onToggle = () => visible.value = !visible.value
        const onOpen = () => visible.value = true
        const onClose = () => visible.value = false
        watch(() => props.modelValue, val => visible.value = val)
        watch(visible, val => context.emit('update:modelValue', val))

        let popoverContStyle = computed(() => {
            let _width = props.width
            if (typeof _width === 'number' || (typeof _width === 'string' && !_width.includes('px'))) _width = Number(_width) + 'px'
            return {
                width: _width
            }
        })

        return {
            popoverContStyle,
            visible,
            onToggle,
            onOpen,
            onClose
        }
    }
}
</script>