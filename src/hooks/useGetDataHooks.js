import { reactive, watch } from 'vue'

/**
 * 通用获取分页列表
 * 参考通过React的自定义hook思想，使用Vue3.0的函数式编程实现
 * @param {Function} api 
 * @param {Object} params 
 */
const GetDataHooks = (listKey = '', api, params = {}, config = {}) => {
    // 参数校验
    if (listKey === '') throw Error('listKey 参数有误')
    if (typeof api !== 'function') throw Error('api 参数有误')
    if (typeof params !== 'object') throw Error('params 参数有误')

    // 初始化基本数据
    let tables = reactive({ 
        loading: false,
        page: 1,
        pageSize: 10,
        total: 0,
        list: [],
        ...config
    })

    // 参数修改，获取列表
    watch(params, () => {
        tables.page = 1
        getList()
    })

    // 生成参数
    const handleParams = () => {
        return {
            limit: tables.pageSize,
            offset: (tables.page - 1) * tables.pageSize,
            ...params
        }
    }
    
    // 获取列表
    const getList = () => {
        tables.loading = true
        tables.total = 0
        tables.list = []
        let _params = handleParams()
        api(_params).then(res => {
            tables.total = res.total
            tables.list = res[listKey]
            tables.loading = false
        }).catch(() => {
            tables.loading = false
        })
    }

    getList()
    
    return {
        tables,
        getList
    }
}

export default GetDataHooks