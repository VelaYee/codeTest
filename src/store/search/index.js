// search的小仓库
import {reqGetSearchInfo} from '@/api'

const state={
    searchList:{}
}

const mutations={
    GETSEARCHLIST(state,searchList){
        state.searchList=searchList
    }
}

const actions={
    // 获取search模块数据
    // params={} 是函数参数的默认值 即如果传了参数则是params 否则是{} 一个空对象
    async getSearchList({commit},params={}){
        // params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params)
        if(result.code==200){
            commit('GETSEARCHLIST',result.data)
        }
    }
}

// 计算属性 在项目中为了简化数据而生
const getters={
    goodsList(state){
        // 如果服务器数据回来了，没问题是一个数组
        // 如果网络不给力 那么searchList是一个空对象 返回的就是undefined
        // 计算新的属性的属性值至少给人家来一个数组
        return state.searchList.goodsList||[]
    },
    trademarkList(state){
        return state.searchList.trademarkList||[]
    },
    attrsList(state){
        return state.searchList.attrsList||[]
    },
}

export default{
    state,
    mutations,
    actions,
    getters
}