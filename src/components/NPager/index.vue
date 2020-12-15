<template>
    <div class="nc-pager">
        {{ total }} - {{ page }} - {{ pageSize }}
        <ul>
            <li>&lt;</li>
            <li>&gt;</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'NPager',

    props: {
        total: {
            type: Number,
            default: 0
        },
        page: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number,
            default: 50
        }
    }
}
</script>