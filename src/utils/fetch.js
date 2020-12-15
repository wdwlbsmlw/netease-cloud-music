import axios from 'axios'

/**
 * Fetch
 * @param {String} url api router
 * @param {Object} params api params
 * @param {String} method ajax type (post|get)
 * @param {Object} config axios instance other config
 * @author David Lee
 * @date 2020-09-17 10:49:32
 */
export const fetch = (url, params, method = 'post', config = {}) => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token') || ''
        const instance = axios.create({
            baseURL: '/api',
            timeout: 1000 * 60 * 5,
            withCredentials: true,
            headers: {
                Authorization: token
            },
            validateStatus: status => {
                return status >= 200 && status < 300
            },
        })
        const _config = {
            url: url,
            method: method,
            [method === 'post' ? 'data' : 'params']: params,
            ...config,
        }
        instance
            .request(_config)
            .then(res => {
                const _data = res.data
                if (_data.code === 200) resolve(_data)
                else reject()
            })
            .catch(error => {
                if (axios.isCancel(error)) return reject(error)
                reject(error)
            })
    })
}

/**
 * Fetch Post
 * @param {String} url api router
 * @param {Object} params api params
 * @param {Object} config axios instance other config
 * @author David Lee
 * @date 2020-09-17 10:49:32
 */
export const post = (url, params, config = {}) => {
    return fetch(url, params, 'post', config)
}

/**
 * Fetch Get
 * @param {String} url api router
 * @param {Object} params api params
 * @param {Object} config axios instance other config
 * @author David Lee
 * @date 2020-09-17 10:49:32
 */
export const get = (url, params, config = {}) => {
    return fetch(url, params, 'get', config)
}
