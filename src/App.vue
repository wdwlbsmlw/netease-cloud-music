<template>
    <div class="nc-layout">
        <n-header></n-header>
        <n-menu></n-menu>
        <div class="nc-split"></div>
        <div class="nc-content">
            <router-view></router-view>
        </div>
        <div class="nc-footer"></div>
    </div>
</template>

<script>
import Header from '@/components/Header'
import Menu from '@/components/Menu'

export default {
    name: 'App',

    components: {
        NHeader: Header,
        NMenu: Menu
    },

    data() {
        return {

        }
    }
}
</script>