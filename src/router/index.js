import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

// 重写push/replace
let originPush=VueRouter.prototype.push
let originReplace=VueRouter.prototype.replace

VueRouter.prototype.push=function(location,resolve,reject){
    if(resolve&&reject){
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}

VueRouter.prototype.replace=function(location,resolve,reject){
    if(resolve&&reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}

export default new VueRouter({
   routes,
   scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    // 代表滚动条在最上方（最小是0）
    return {y:0}
  }
})