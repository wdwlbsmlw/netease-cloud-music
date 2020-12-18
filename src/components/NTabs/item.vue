<template>
    <div class="nc-tabs-item" v-if="currentActive === name">
        <slot></slot>
    </div>
</template>

<script>
import { inject, watch } from 'vue'
export default {
    name: 'NTabs',

    props: {
        label: {
            type: String,
            default: ''
        },
        name: {
            type: [String, Number],
            required: true,
            default: ''
        }
    },

    setup(props) {
        const currentActive = inject('currentActive')
        const onUpdateSlots = inject('onUpdateSlots')
        watch(() => props.label, () => {
            onUpdateSlots()
        })
        return {
            currentActive
        }
    }
}
</script>