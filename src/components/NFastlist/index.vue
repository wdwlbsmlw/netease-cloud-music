<template>
    <div class="nc-fastlist">
        <template v-if="listType === 'array'">
            <span v-for="item in listTop10" :key="item" :class="{active: item === modelValue}" @click="onHandle(item)">{{ item }}</span>
        </template>
        <template v-if="listType === 'object'">
            <span v-for="(item, key) in listTop10" :key="key" :class="{active: key === modelValue}" @click="onHandle(key)">{{ item }}</span>
        </template>
    </div>
</template>

<script>
import { computed } from 'vue'
export default {
    name: 'NFastlist',

    props: {
        modelValue: {
            type: [String, Number]
        },
        list: {
            type: [Array, Object],
            required: true,
            default: () => []
        },
        maxLength: {
            type: Number,
            default: 10
        }
    },

    setup(props, context) {
        const listType = computed(() => Array.isArray(props.list) ? 'array' : 'object')

        const onHandle = val => {
            if (val === props.modelValue) return
            context.emit('update:modelValue', val)
        }

        const listTop10 = computed(() => {
            if (listType.value === 'array') {
                return props.list.length > props.maxLength ? props.list.slice(0, props.maxLength) : props.list
            } else if (listType.value === 'object') {
                let _len = Object.keys(props.list)
                if (_len <= props.maxLength) return props.list
                let _list = {}, _i = 1
                for (const key in props.list) {
                    if (_i > props.maxLength) break
                    props.list[key]
                    _list[key] = props.list[key]
                    _i++
                }
                return _list
            }
        })

        return {
            listType,
            listTop10,
            onHandle
        }
    }
}
</script>