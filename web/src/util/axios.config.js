import axios from 'axios'

// ✅ 从环境变量读取 baseURL
const baseURL = import.meta.env.VITE_API_BASE_URL || '/webapi'

// 创建一个 axios 实例
const instance = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    withCredentials: true
})

// ✅ web 项目不需要 token，所以没有请求拦截器

export default instance