import Vue from 'vue'
import App from './App.vue'
// 三级联动组件 全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from'@/components/Carousel'
import Pagination from'@/components/Pagination'


//  全局注册：Vue.component( '键名' , 组件名 )
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)


Vue.config.productionTip = false
import router from '@/router'
import store from '@/store'

import '@/mock/mockServer'

import "swiper/css/swiper.css"

new Vue({
  render: h => h(App),
  // 全局事件总线$bus的配置
  beforeCreate() {
    Vue.prototype.$bus=this
  },
  router,
  // 注册仓库，组件实例身上会多一个属性$store属性
  store,
}).$mount('#app')
