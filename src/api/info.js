import axios from '@/fetch'
/* 仿例简化 */
export function getInfo() {
    return axios({
        url: "/info.php",
        methods: "get"
    })
}