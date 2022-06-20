/* import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";

// 引入二级路由组件
import MyOrder from "@/pages/Center/myOrder";
import GroupOrder from "@/pages/Center/groupOrder"; */

// 路由懒加载 当路由被访问时才加载对应组件(由于打包构建应用时，JS包会变得非常大，影响页面加载)
// 使用路由懒加载就不用再引入了

export default [
  {
    path: "/home",
    component: () => import("@/pages/Home"),
    // 是否显示Footer
    meta: { show: true },
  },
  {
    path: "/detail/:skuId?",
    component: () => import("@/pages/Detail"),
    meta: { show: true },
  },
  {
    path: "/addcartsuccess/:skuNum?",
    name: "addcartsuccess",
    component: () => import("@/pages/AddCartSuccess"),
    meta: { show: true },
  },
  {
    path: "/shopcart",
    component: () => import("@/pages/ShopCart"),
    meta: { show: true },
  },
  {
    path: "/trade",
    component: () => import("@/pages/Trade"),
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path == "/shopcart") {
        next();
      } else {
        // 从哪儿来回哪儿去
        next(false);
      }
    },
  },
  {
    path: "/pay",
    component: () => import("@/pages/Pay"),
    beforeEnter: (to, from, next) => {
      if (from.path == "/trade") {
        next();
      } else {
        next(false);
      }
    },
    meta: { show: true },
  },
  {
    path: "/paysuccess",
    component: () => import("@/pages/PaySuccess"),
    beforeEnter: (to, from, next) => {
      if (from.path == "/pay") {
        next();
      } else {
        next(false);
      }
    },
    meta: { show: true },
  },
  {
    path: "/center",
    component: () => import("@/pages/Center"),
    meta: { show: true },
    // 二级路由组件
    children: [
      {
        path: "myorder",
        component: () => import("@/pages/Center/myOrder"),
      },
      {
        path: "grouporder",
        component: () => import("@/pages/Center/groupOrder"),
      },
      {
        path: "/center",
        redirect: "/center/myorder",
      },
    ],
  },
  {
    // 最后加问号的目的：params参数可传可不传
    path: "/search/:keyword?",
    component: () => import("@/pages/Search"),
    name: "search",
    meta: { show: true },
    // props常用写法如下：（函数写法） 这样在组件里就可以直接用了 不用再写前面一大串了再去找了
    // 箭头函数 把路由信息注入
    props: ($route) => ({
      keyword: $route.params.keyword,
      k: $route.query.k,
    }),
  },
  {
    path: "/login",
    component: ()=>import('@/pages/Login'),
    meta: { show: false },
  },
  {
    path: "/register",
    component: ()=>import('@/pages/Register'),
    meta: { show: false },
  },

  {
    path: "*",
    redirect: "/home",
  },
];
