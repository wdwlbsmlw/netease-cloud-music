<template>
    <div class="nc-tabs">
        <div class="nc-tabs-header">
            <div class="nc-tabs-header-item" v-for="item in tabList" :key="item.name" :class="{active: currentActive === item.name}" @click="onHandle(item)">
                {{ item.label }}
            </div>
        </div>
        <div class="nc-tabs-cont">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { provide, reactive, ref, watch } from 'vue'
export default {
    name: 'NTabs',

    props: {
        modelValue: {
            type: [String, Number],
            default: ''
        }
    },

    setup(props, context) {
        const currentActive = ref(props.modelValue)
        watch(() => props.modelValue, val => currentActive.value = val)

        let tabList = reactive([])
        const initTabList = () => {
            tabList = reactive([])
            tabList = context.slots.default().map(el => {
                return {
                    label: el.props.label,
                    name: el.props.name
                }
            })
        }

        const onHandle = item => context.emit('update:modelValue', item.name)

        const onUpdateSlots = () => {
            initTabList()
        }
        provide('currentActive', currentActive)
        provide('onUpdateSlots', onUpdateSlots)

        initTabList()

        return {
            currentActive,
            tabList,
            onHandle
        }
    }
}
</script>