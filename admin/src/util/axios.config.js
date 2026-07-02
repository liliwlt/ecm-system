//对axios进行拦截器的配置

import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || '/adminapi'

const instance = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    withCredentials: true
})



// 请求拦截器，在请求之前执行     请求    每个请求自动带上 token
instance.interceptors.request.use( function (config) {
    const token = localStorage.getItem("token")     //带着token去请求
    config.headers.Authorization = `Bearer ${token}` 

    return config;
  }, function (error) {
    return Promise.reject(error);
  });

// 响应拦截器，在获取数据之前执行   成功响应      保存后端返回的新 token
instance.interceptors.response.use( function (response) {
    //console.log(response.headers)
    const {authorization} = response.headers
    authorization && localStorage.setItem("token",authorization)    //把token存在这里

    return response;
  }, function (error) {
    //token失效
    const {status} = error.response
    if(status===401){
      localStorage.removeItem("token")     
      window.location.href="#/tokenlose"      //没有引入路由
    }

    return Promise.reject(error);
  });

export default instance

