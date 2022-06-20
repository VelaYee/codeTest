import Vue from "vue";
import App from "./App.vue";
// 三级联动组件 全局组件
import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";
import Pagination from "@/components/Pagination";

//  全局注册：Vue.component( '键名' , 组件名 )
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);

Vue.config.productionTip = false;
import router from "@/router";
import store from "@/store";

import "@/mock/mockServer";

import "swiper/css/swiper.css";

// （统一引入）统一接收api文件夹里面的全部请求函数 将所有输出都包裹到API对象里
import * as API from "@/api";

/* import lazyGif from "@/assets/lazyGif.gif";
// const lazyGif=require('./assets/1.gif')
// 引入插件
import VueLazyLoad from "vue-lazyload";
// 注册插件
Vue.use(VueLazyLoad, {
  loading: lazyGif,
}); */

/* ,{
  // 懒加载默认的图片
  loading:lazyGif,
} */

import { MessageBox } from "element-ui";
// element-UI注册组件的时候 还有一种写法就是直接挂在vue原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入表单校验插件
import "@/plugins/validate.js";

new Vue({
  render: (h) => h(App),
  // 全局事件总线$bus的配置
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  router,
  // 注册仓库，组件实例身上会多一个属性$store属性
  store,
}).$mount("#app");
