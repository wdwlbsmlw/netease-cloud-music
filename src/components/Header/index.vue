<template>
    <div class="nc-header">
        <div class="nc-header-logo">
            <img :src="require('@/assets/logo-white.png')" />
        </div>
        <div class="nc-header-search">
            <n-button size="small" icon="icon-arrow-left" @click="navigatePrev"></n-button>
            <n-button size="small" icon="icon-arrow-right" @click="navigateNext"></n-button>
            <n-search></n-search>
        </div>
    </div>
</template>

<script>
import {getCurrentInstance} from 'vue'

export default {
    name: 'Header',

    setup() {
        const {ctx} = getCurrentInstance()
        const navigatePrev = () => {
            ctx.$router.back()
        }
        const navigateNext = () => {
            ctx.$router.forward()
        }
        return {
            navigatePrev,
            navigateNext
        }
    }
}
</script>