import { reactive } from 'vue'

/**
 * 通用获取分页列表
 * 参考通过React的自定义hook思想，使用Vue3.0的函数式编程实现
 * @param {Function} api 
 * @param {Object} params 
 */
const GetDetail = (listKey = '', api, params = {}) => {
    // 参数校验
    if (listKey === '') throw Error('listKey 参数有误')
    if (typeof api !== 'function') throw Error('api 参数有误')
    if (typeof params !== 'object') throw Error('params 参数有误')

    
    // 获取列表
    const detail = reactive({data: {}, loading: false})
    const getDetail = () => {
        detail.loading = true
        api(params).then(res => {
            detail.data = res[listKey]
            detail.loading = false
        }).catch(() => {
            detail.loading = false
        })
    }

    getDetail()
    
    return {
        detail,
        getDetail
    }
}

export default GetDetail