import axios from 'axios'
import qs from 'qs'
import {Message} from 'element-ui'

const baseURL = 'http://192.168.1.102';

export const wsURL = "ws://192.168.1.102:9000";

const service = axios.create({
    baseURL,
    timeout: 5000,
    withCredentials: true
});

service.interceptors.request.use(
    config => {
        config.headers = {
            'content-Type' : 'application/x-www-form-urlencoded'
        }
        return config
    }
    
)

service.interceptors.response.use(
    response => response,
    error => {
        if(error.message.includes('timeout')) {
            Message({
                message: '连接请求超时',
                type: 'warning'
            })
            return Promise.reject(error)
        }else { 
            Message({
                message: '请求配置发生错误或服务器未启动',
                type: 'warning'
            })
            return Promise.reject(error)
        }
    }
)
export default service

