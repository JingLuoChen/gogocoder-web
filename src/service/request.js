import axios from 'axios'

// 创建axios实例
export const service = axios.create({
    baseURL: '',
    timeout: 30000, // 请求超时时间,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    params: {},
    // withCredentials : true
})

// request拦截器
service.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(
    (response) => {
        return response.data;
    },
    //接口错误状态处理，也就是说无响应时的处理
    (error) => {
        return Promise.reject(error.response.status); // 返回接口返回的错误信息
    }
)
