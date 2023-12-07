//配置全局得基础配置
import axios from "axios";
//配置中心
import webConfig from "@/global.config.js"
import router from "@/router";
//baseURL,timeout,header,responseType,withCredentials
//后面的请求用request来发
let request = axios.create({
    //1,基础配置
    baseURL: "http://localhost:8888/",
    timeout: 30 * 1000,
    responseType: "json",
})

// 请求拦截器 （前端-->后端）
request.interceptors.request.use((config) => {
    //token，密钥得设置
    let whiteList = webConfig.whiteListApi
    let url = config.url
    let token = localStorage.getItem("token");
    if (whiteList.indexOf(url) === -1 && token) {
        config.headers.token = token;
    }
    return config;
}, error => {
    return Promise.reject(new Error(error))
})

// 响应拦截器 （后端-->前端）
request.interceptors.response.use((res) => {
    //响应得统一处理
    const status = res.data.code || 200
    const message = res.data.msg || "未知错误";
    if (status === 401) {
        console.log("你没有权限");
        router.push("/about")
        return Promise.reject(new Error(message));
    }
    if (status !== 200) {
        console.log("错误码" + status + "   " + message);
        return Promise.reject(new Error(message));
    }
    return res;
}, error => {
    //真实项目中，往往使用组件库得消息提示 $waring
    console.log(error)
    return Promise.reject(new Error(error));
})
export default request;
