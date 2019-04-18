import axios from '@/fetch'

export function getConnect(data) {
    return axios({
        url: '/login',
        method: "POST",
        data: JSON.stringify(data)
    })
}