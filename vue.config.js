const path = require('path')

// const isProduction = process.env.NODE_ENV !== 'development'

module.exports = {
    // 生产环境不需要map文件
    productionSourceMap: false,

    // 让 node_modules 下的模块使用 babel-loader (可兼容IE语法报错)
    // transpileDependencies: ['view-design'],

    // 打包路径
    outputDir: `build_${process.env.VUE_APP_ENVIRONMENT || ''}`,

    // CND
    // publicPath: process.env.NODE_ENV === 'development' ? '' : '',

    integrity: true,

    devServer: {
        // 统一使用localhost，解决本地内网socket跨域问题
        // host: 'localhost',

        proxy: {
            '/api': {
                target: 'http://localhost:3000/',
                changeOrigin: true,
                secure: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },

    chainWebpack: config => {
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))

        // 设置导入前缀映射
        config.resolve.alias.set('@', path.join(__dirname, 'src'))

        // 移除 prefetch 插件
        config.plugins.delete('prefetch')
        // 移除 preload 插件
        config.plugins.delete('preload')

        // if (isProduction) {
        //     // 生产环境注入cdn
        //     config.plugin('html').tap(args => {
        //         args[0].cdn = jscdn
        //         return args
        //     })
        // }
    },

    // configureWebpack: config => {
    //     if (isProduction) {
    //         // 用cdn方式引入
    //         config.externals = {
    //             vue: 'Vue',
    //             vuex: 'Vuex',
    //             'vue-router': 'VueRouter',
    //             axios: 'axios',
    //             AMap: 'AMap'
    //         }
    //     }
    // },

}

// 注入less
function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [path.resolve(__dirname, 'src/styles/variables.less')]
        })
}
