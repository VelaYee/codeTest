import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";

const state = {
  cartList: [],
};

const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  },
};

const actions = {
  async getCartList({ commit }) {
    let result = await reqCartList();
    if (result.code == 200) {
      commit("GETCARTLIST", result.data);
    }
  },
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("falie"));
    }
  },
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedById(skuId, isChecked);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("falie"));
    }
  },
  // 删除全部勾选的商品
  deleteAllCheckedCart({ dispatch, getters }) {
    // context:commit【提交mutaions修改state】 getters【计算属性】 dispatch【派发action】 state【当前仓库数据】
    let PromiseAll = [];
    getters.cartList.cartInfoList.forEach((item) => {
      let promise =
        item.isChecked == 1
          ? dispatch("deleteCartListBySkuId", item.skuId)
          : "";
      PromiseAll.push(promise);
    });
    return Promise.all(PromiseAll);
  },
  // 修改全部商品的状态
  async updateAllCartIsChecked({ dispatch, state }, isChecked) {
    let PromiseAll = [];
    state.cartList[0].cartInfoList.forEach((item) => {
      let promise = dispatch("updateCheckedById", {
        skuId: item.skuId,
        isChecked,
      });
      PromiseAll.push(promise);
    });
    return Promise.all(PromiseAll);
  },
};

const getters = {
  cartList(state) {
    return state.cartList[0] || {};
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
