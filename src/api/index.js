import { get } from '@/utils/fetch'

// 歌单分类
export const GetPlaylistCatlist = (params = {}, config = {}) => get('/playlist/catlist', params, config)
// 获取歌单列表（网友精选碟）
export const GetTopPlayList = (params = {}, config = {}) => get('/top/playlist', params, config)
// 根据ID获取歌单详情
export const GetPlayListDetail = (params = {}, config = {}) => get('/playlist/detail', params, config)