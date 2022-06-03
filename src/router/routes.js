import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'

export default [
    {
        path:'/home',
        component:Home,
        meta:{show:true}
    },
    {
        path:'/detail/:skuId?',
        component:Detail,
        meta:{show:true},

    },
    {
        // 最后加问号的目的：params参数可传可不传
        path:'/search/:keyword?',
        component:Search,
        name:'search',
        meta:{show:true},
        // props:true,
      /*   props:{
            a:1,
            b:2,
        } */
        // props常用写法如下：（函数写法） 这样在组件里就可以直接用了 不用再写前面一大串了再去找了
        // 箭头函数 把路由信息注入
        props:($route)=>({
                keyword:$route.params.keyword,
                k:$route.query.k
        })
    },
    {
        path:'/login',
        component:Login,
        meta:{show:false}
    }, 
    {
        path:'/register',
        component:Register,
        meta:{show:false}
    },
   
    {
        path:'*',
        redirect:'/home'
    }
]