// home的小仓库
import {reqCategoryList,reqGetBannerList,reqFloorList} from '@/api'

const state={
    // state中数据默认初始值别瞎写，服务器返回对象就是对象，返回数组就是数组【一定要根据接口返回值初始化】
    categoryList:[],
    bannerList:[],
    floorList:[]
}

// mutation必须同步执行
// 唯一改变store状态的方法
// 唤醒一个mutation处理函数 以相应的type调用store.commit(type, payload)方法
const mutations={
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList=bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList=floorList
    }
}

// 可以在actions中写异步的
// 分发action store.dispatch
const actions={
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    // 执行async返回的是promise对象
    async categoryList({commit}){
        // {commit}是参数解构 实际上是 context.commit
        // axios返回的是一个promise 
        // await 等待这个promise执行成功才往下进行
        let result= await reqCategoryList()
        if(result.code==200){
            // 调用context.commit()提交一个mutation
            commit('CATEGORYLIST',result.data)
        }
    },
    async getBannerList({commit}){
        let result=await reqGetBannerList()
        if(result.code==200){
            commit('GETBANNERLIST',result.data)
        }
    },
    async getFloorList({commit}){
        let result=await reqFloorList()
        if(result.code==200){
            commit('GETFLOORLIST',result.data)
        }
    },
}

const getters={
    
}

export default{
    state,
    mutations,
    actions,
    getters
}