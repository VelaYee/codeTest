// 对axios进行二次封装

import axios from 'axios'
// 引入进度条 start-done
import nprogress from 'nprogress'
// 在当前模块中引入store
import store from '@/store'
// 引入进度条样式
import "nprogress/nprogress.css"


// 1. 创建一个axios实例
const requests=axios.create({
    // 基础路径
    baseURL:'/api',
    // 代表请求超时的时间
    timeout:5000,
})

// 2. 请求拦截器(在请求发出去之前做一些事情)
requests.interceptors.request.use((config)=>{
    // config：配置对象，对象里面有一个属性很重要，headers请求头
    if(store.state.detail.uuid_token){
        // 给请求头添加一个字段——和后台已商量好的字段
        config.headers.userTempId=store.state.detail.uuid_token
    }
    // 携带token带给服务器
    if(store.state.user.token){
        config.headers.token=store.state.user.token
    }
    nprogress.start()
    return config
})

// 3. 响应拦截器
requests.interceptors.response.use(
    // 服务器响应成功的
    (res)=>{
        nprogress.done()
        return res.data
    },
    // 服务器响应失败的
    (error)=>{
        return Promise.reject(new Error('faile'))
    }
)

//  4. 对外暴露
export default requests;