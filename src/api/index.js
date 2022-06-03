// API接口进行统一管理
import requests from "./request";
import mockRequests from './mockAjax'

// 三级联动接口
// /api/product/getBaseCategoryList get请求 无参数    
// 发请求:axios发请求返回结果是promise
export const reqCategoryList=()=> requests({url:'/product/getBaseCategoryList',method:'get'})
//  这里是分别暴露 引用的时候要加{ XXX }

export const reqGetBannerList=()=>mockRequests.get('/banner')

export const reqFloorList=()=>mockRequests.get('/floor')

// post请求 需要带参
export const reqGetSearchInfo=(params)=>requests({
    url:'/list',
    method:'post',
    // 当前这个接口（获取搜索模块的数据），给服务器传递一个默认参数【至少是一个空对象】 即params={}
    data:params
})

export const reqGoodsInfo=(skuId)=>requests({
    url:`/item/${skuId}`,
    method:'get'
})
