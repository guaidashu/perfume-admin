import axios from '@/libs/api.request'

export const getUserInfo = (post) => {
    return axios.request({ url: 'admin/users/getUserInfo', params: post, method: 'get' })
}

export const changePassword = (post) => {
    return axios.request({ url: 'admin/users/changePassword', method: 'POST', data: post })
}

export const deleteUser = (post) => {
    return axios.request({ url: 'admin/users/deleteUser', method: 'post', data: post })
}
