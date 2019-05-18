import axios from '@/libs/api.request'

export const getGoodsInfo = (param) => {
    return axios.request({ url: 'admin/goods/getGoodsInfo', params: param, method: 'get' })
}

export const addGoods = (post) => {
    return axios.request({ url: 'admin/goods/addGoods', data: post, method: 'post' })
}

export const deleteGoods = (post) => {
    return axios.request({ url: 'admin/goods/deleteGoods', data: post, method: 'post' })
}

export const updateGoods = (post) => {
    return axios.request({ url: 'admin/goods/updateGoods', data: post, method: 'post' })
}

export const uploadType = (post) => {
    return axios.request({ url: 'admin/goods/uploadType', data: post, method: 'post' })
}

export const getTypeData = (post) => {
    return axios.request({ url: 'admin/goods/getTypeData', data: post, method: 'post' })
}

export const deleteType = (post) => {
    return axios.request({ url: 'admin/goods/deleteType', data: post, method: 'post' })
}

export const uploadTypeInfo = (post) => {
    return axios.request({ url: 'admin/goods/uploadTypeInfo', data: post, method: 'post' })
}

export const getTypeAllData = () => {
    return axios.request({ url: 'admin/goods/getTypeAllData', method: 'post' })
}
