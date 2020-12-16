<template>
    <div class="nc-catlist">
        <div class="nc-catlist-header">
            <n-button type="primary" plain @click="onHandleAll">全部歌单</n-button>
        </div>
        <div class="nc-catlist-cont">
            <div class="nc-catlist-row" v-for="(cat, cat_index) in data.categories" :key="cat_index">
                <div class="nc-catlist-row-title">
                    <i :class="`iconfont ${categoriesIcons[cat]}`"></i>
                    <span>{{ cat }}</span>
                </div>
                <div class="nc-catlist-row-cont">
                    <div class="nc-catlist-row-cont-item" v-for="item in data.sub[cat_index]" :key="item.name" :class="{active: currentValue === item.name}" @click="onHandle(item)">
                        <span>{{ item.name }} <span v-if="item.hot" class="hot">HOT</span></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { GetPlaylistCatlist } from '@/api'
import { reactive, ref, watch} from 'vue'
export default {
    name: 'NCatlist',

    props: {
        modelValue: {
            type: String,
            default: '全部'
        }
    },

    setup(props, context) {
        let categoriesIcons = reactive({
            '语种': 'icon-earth',
            '风格': 'icon-piano',
            '场景': 'icon-coffe',
            '情感': 'icon-smile',
            '主题': 'icon-theme'
        })

        let currentValue = ref(props.modelValue)
        watch(() => props.modelValue, val => currentValue.value = val)
        watch(currentValue, val => {
            context.emit('update:modelValue', val)
            context.emit('change', val)
        })
        const onHandle = item => {
            currentValue.value = item.name
        }
        const onHandleAll = () => currentValue.value = '全部'

        let data = reactive({})
        const getList = () => {
            data = reactive({})
            GetPlaylistCatlist().then(res => {
                data.categories = reactive(res.categories)
                let _sub = {}
                res.sub.forEach(el => {
                    if (!Object.prototype.hasOwnProperty.call(_sub, el.category)) _sub[el.category] = []
                    if (el.name) _sub[el.category].push(el)
                })
                data.sub = reactive(_sub)
            })
        }
        getList()

        return {
            categoriesIcons,
            currentValue,
            data,
            onHandle,
            onHandleAll
        }
    }
}
</script>