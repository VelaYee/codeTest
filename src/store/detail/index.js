// home的小仓库
import { reqGoodsInfo } from "@/api";

const state = {
    goodInfo:{},
};

const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo=goodInfo
    }
};

const actions = {
  async getGoodInfo({ commit },skuId) {
    let result = await reqGoodsInfo(skuId);
    if (result.code == 200){
      commit("GETGOODINFO", result.data);
    }
  },
};

const getters = {
    categoryView(state){
        //在还未获取服务器数据时，goodInfo是空的 对goodInfo进行属性的读取就是undefined
        return state.goodInfo.categoryView||{}
    },
    skuInfo(state){
        return state.goodInfo.skuInfo||{}
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[]
    }
};

export default {
  state,
  mutations,
  actions,
  getters,
};
