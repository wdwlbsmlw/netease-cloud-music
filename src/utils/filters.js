Date.prototype.format = function(format) {
    let o = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (let k in o) if (new RegExp('(' + k + ')').test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    return format
}

export default {
    // 时间
    datetime: (val, fmt = 'yyyy-MM-dd hh:mm:ss', empty = '-') => {
        if (val === 0 || val === '0' || val === null || val === undefined || isNaN(val)) return empty
        try {
            return new Date(val).format(fmt)
        } catch (e) {
            return val
        }
    },
    // 文本截断
    truncate: (val, len = 20) => {
        if (val === null || val === undefined || isNaN(val)) return ''
        return val.toString().length > len ? val.toString().substr(0, len) + '...' : val
    },
    // 数字转换
    numConvert: (val, split = 100000, base = 10000) => {
        val = Number(val)
        if (isNaN(val)) return 0
        return val >= split ? `${Math.floor(val/base)} 万` : val
    }
}