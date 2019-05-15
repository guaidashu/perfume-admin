import axios from '@/libs/api.request'

export const getUserInfo = (post) => {
    return axios.request({ url: 'admin/users/getUserInfo', params: post, method: 'get' })
}
