import axios from '@/fetch'

export function getConnect(data) {
    return axios({
        url: "/server.php",
        methods: "post",
        params: data
    })
}