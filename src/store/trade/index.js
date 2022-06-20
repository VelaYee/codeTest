import { reqAddressInfo, reqOrderInfo } from "@/api";

const state = {
  addressInfo: [],
  orderInfo: {},
};

const mutations = {
  GETUSERADDRESS(state, addressInfo) {
    state.addressInfo = addressInfo;
  },
  GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo;
  },
};

const actions = {
  async getUserAddress({ commit }) {
    let result = await reqAddressInfo();
    if (result.code == 200) {
      commit("GETUSERADDRESS", result.data);
    } else {
      return Promise.reject(new Error("falie"));
    }
  },
  async getOrderInfo({ commit }) {
    let result = await reqOrderInfo();
    if (result.code == 200) {
      commit("GETORDERINFO", result.data);
    } else {
      return Promise.reject(new Error("falie"));
    }
  },
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
