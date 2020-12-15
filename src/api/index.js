import { get } from '@/utils/fetch'

// 获取歌单列表（网友精选碟）
export const GetTopPlayList = (params = {}, config = {}) => get('/top/playlist', params, config)