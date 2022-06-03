import Mock from 'mockjs'
// 为什么JSON数据格式没有对外暴露但是可以引入?
// webpack默认对外暴露的:图片、JSON数据格式
import banner from './banner.json'
import floor from './floor.json'

Mock.mock("/mock/banner",{code:200,data:banner})
Mock.mock("/mock/floor",{code:200,data:floor})