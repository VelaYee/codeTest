// 对axios进行二次封装
import axios from 'axios'
// 引入进度条 start-done
import nprogress from 'nprogress'
// 引入进度条样式
import "nprogress/nprogress.css"


// 1. 创建一个axios实例
const requests=axios.create({
    // 基础路径
    baseURL:'/mock',
    // 代表请求超时的时间
    timeout:5000,
})

// 2. 请求拦截器(在请求发出去之前做一些事情)
requests.interceptors.request.use((config)=>{
    // config：配置对象，对象里面有一个属性很重要，headers请求头
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