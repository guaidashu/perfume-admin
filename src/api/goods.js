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
