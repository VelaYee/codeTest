import {
  reqGetCode,
  reqUserRegister,
  reqUserLogin,
  reqUserInfo,
  reqLogout,
} from "@/api";
import { setToken, getToken, removeToken } from "@/utils/token";

const state = {
  code: "",
  // 若token存在 直接从本地session中获取
  token: getToken(),
  userInfo: {},
};

const mutations = {
  GETCODE(state, code) {
    state.code = code;
  },
  USERLOGIN(state, token) {
    state.token = token;
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  CLEAR(state) {
    state.token = "";
    state.userInfo = {};
    removeToken();
  },
};

const actions = {
  async getCode({ commit }, phone) {
    let result = await reqGetCode(phone);
    if (result.code == 200) {
      commit("GETCODE", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("falie"));
    }
  },
  async userRegister({ commit }, user) {
    let result = await reqUserRegister(user);
    // console.log(result);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("falie"));
    }
  },
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data);
    // console.log(result);
    // 让服务器下发token 用户唯一标识符uuid
    // 将来经常通过带token找服务器要用户信息进行展示
    // 注意：vuex仓库存储数据---不是持久化的 一刷新就全没了(所以每次刷新完都要再次派发action)
    if (result.code == 200) {
      // 已登陆成功，获取到token
      commit("USERLOGIN", result.data.token);
      setToken(result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error("falie"));
    }
  },
  async getUserInfo({ commit }) {
    let result = await reqUserInfo();
    if (result.code == 200) {
      commit("GETUSERINFO", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("falie"));
    }
  },
  // reqLogout
  async userLogout({ commit }) {
    let result = await reqLogout();
    if (result.code == 200) {
      // action里不能操作state,必须通过mutation来进行修改
      commit("CLEAR");
      return "ok";
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
